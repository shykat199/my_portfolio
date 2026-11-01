"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { site } from "@content/site";
import { sendContactMessage, type ContactField, type ContactState } from "@/app/actions";

const { contact } = site;

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 block w-full rounded-lg border bg-raised px-3.5 py-3 text-base text-fg transition-colors focus:border-accent";

type FieldProps = {
  name: ContactField;
  label: string;
  state: ContactState;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  multiline?: boolean;
};

function Field({ name, label, state, type = "text", autoComplete, required, multiline }: FieldProps) {
  const error = state.errors?.[name];
  const shared = {
    id: name,
    name,
    required,
    defaultValue: state.values?.[name],
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${name}-error` : undefined,
    className: `${inputClass} ${error ? "border-error" : "border-fg/25"}`,
  };

  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-lg bg-surface p-7 text-fg sm:p-9">
        <h3 className="text-3xl leading-tight">{contact.formTitle}</h3>
        <p className="mt-3 text-lg leading-relaxed">{contact.success}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-lg bg-surface p-6 text-fg sm:p-9">
      <h3 className="text-3xl leading-tight">{contact.formTitle}</h3>

      <div ref={statusRef} tabIndex={-1} role="alert">
        {state.status === "invalid" && (
          <p className="mt-4 text-sm font-medium text-error">{contact.invalid}</p>
        )}
        {state.status === "failure" && (
          <p className="mt-4 text-sm font-medium text-error">
            {contact.failure}{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-2">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>

      <div className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="name" label={contact.fields.name} state={state} autoComplete="name" required />
          <Field
            name="email"
            label={contact.fields.email}
            state={state}
            type="email"
            autoComplete="email"
            required
          />
          <Field
            name="business"
            label={contact.fields.business}
            state={state}
            autoComplete="organization"
            required
          />
          <Field name="website" label={contact.fields.website} state={state} autoComplete="url" />
        </div>
        <Field name="message" label={contact.fields.message} state={state} required multiline />

        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="company_fax">Leave this field empty</label>
          <input id="company_fax" name="company_fax" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-accent px-6 font-medium text-surface transition-colors hover:bg-accent-strong disabled:cursor-wait disabled:opacity-75 sm:w-auto"
      >
        {pending ? contact.sending : contact.submit}
      </button>

      <p className="mt-4 text-sm text-muted">
        {contact.privacyNote}{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-fg">
          {contact.privacyLink}
        </Link>
        .
      </p>
    </form>
  );
}
