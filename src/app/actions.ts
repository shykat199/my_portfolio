"use server";

import { Resend } from "resend";
import { z } from "zod";
import { site } from "@content/site";

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
      error: "Please enter a valid website address, like example.co.uk.",
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return { status: "failure", values };
  }

  const { name, email, business, website, message } = parsed.data;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: `Website enquiry <website@${new URL(site.url).hostname}>`,
      to: site.email,
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
      return { status: "failure", values };
    }
  } catch (error) {
    console.error("Contact form: could not reach Resend", error);
    return { status: "failure", values };
  }

  return { status: "success" };
}
