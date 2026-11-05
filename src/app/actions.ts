"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@content/site";
import { getSettings } from "@/lib/settings";

const websitePattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#]\S*)?$/i;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Please use a shorter name."),
  email: z.email("Please enter a valid email address.").max(200),
  business: z
    .string()
    .trim()
    .min(1, "Please enter your business name.")
    .max(150, "Please use a shorter business name."),
  website: z
    .string()
    .trim()
    .max(200, "Please use a shorter address.")
    .refine((value) => value === "" || websitePattern.test(value), {
      error: "Please enter a valid website address, like example.com.",
    }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell me a little more about what you need.")
    .max(5000, "Please keep your message under 5,000 characters."),
});

export type ContactField = keyof z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "invalid" | "failure";
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

function fieldValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Real visitors never see the honeypot, so anything in it means a bot.
  // Report success so the bot has no reason to try again.
  if (fieldValue(formData, "company_fax")) return { status: "success" };

  const values = {
    name: fieldValue(formData, "name"),
    email: fieldValue(formData, "email").trim(),
    business: fieldValue(formData, "business"),
    website: fieldValue(formData, "website"),
    message: fieldValue(formData, "message"),
  };

  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    const errors: ContactState["errors"] = {};
    for (const key of Object.keys(fieldErrors) as ContactField[]) {
      errors[key] = fieldErrors[key]?.[0];
    }
    return { status: "invalid", errors, values };
  }

  const requestHeaders = await headers();
  const visitor = {
    ip: requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || null,
    userAgent: requestHeaders.get("user-agent"),
  };

  // The message counts as sent if it reaches the admin inbox or your email.
  const [saved, emailed] = await Promise.all([
    saveToInbox(parsed.data, visitor),
    sendEmail(parsed.data),
  ]);

  if (!saved && !emailed) return { status: "failure", values };

  return { status: "success" };
}

type ContactMessage = z.infer<typeof contactSchema>;

/** Saves the message in the admin panel's Messages inbox. */
async function saveToInbox(data: ContactMessage, visitor: { ip: string | null; userAgent: string | null }) {
  const base = process.env.BLOG_API_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!base || !secret) {
    console.error("Contact form: BLOG_API_URL or REVALIDATE_SECRET is not set, so messages can't reach the inbox");
    return false;
  }

  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "x-site-secret": secret },
      body: JSON.stringify({
        ...data,
        website: data.website || null,
        ip_address: visitor.ip,
        user_agent: visitor.userAgent,
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Contact form: the admin panel refused the message", response.status, await response.text());
    }
    return response.ok;
  } catch (error) {
    console.error("Contact form: could not reach the admin panel", error);
    return false;
  }
}

/** Emails the message to you through Resend, if it is set up. */
async function sendEmail({ name, email, business, website, message }: ContactMessage) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      // Resend only sends from a domain verified in your account; until then use its test sender.
      from: process.env.RESEND_FROM || `Website enquiry <website@${new URL(site.url).hostname}>`,
      // Sent to the email in the admin panel (Site settings → Person).
      to: (await getSettings()).person.email,
      replyTo: email,
      subject: `New enquiry from ${name} (${business})`.replace(/[\r\n]+/g, " "),
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business: ${business}`,
        `Website: ${website || "Not given"}`,
        "",
        message,
      ].join("\n"),
    });
    if (error) {
      console.error("Contact form: Resend rejected the message", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Contact form: could not reach Resend", error);
    return false;
  }
}
