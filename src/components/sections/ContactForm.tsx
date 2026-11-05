"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { site } from "@content/site";
import { sendContactMessage, type ContactField, type ContactState } from "@/app/actions";

const { contact } = site;

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 block w-full rounded-lg border bg-raised px-3.5 py-3 text-base text-fg transition-colors placeholder:text-muted/60 focus:border-accent";

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
    placeholder: contact.placeholders[name],
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

const TOAST_SECONDS = 6;

/** "Message sent" notice at the bottom of the screen. Always rendered, so screen readers announce it. */
function SentToast({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6">
      {open && (
        <div className="toast-in pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-lg border border-accent/40 bg-raised p-4 text-fg shadow-[0_20px_50px_-15px_rgb(0_0_0/0.8)]">
          <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-surface">
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 5 5L20 7" />
            </svg>
          </span>
          <p className="flex-1 text-sm leading-snug">
            <span className="block font-medium">{contact.successTitle}</span>
            <span className="mt-0.5 block text-muted">{contact.success}</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={contact.closeToast}
            className="-m-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-fg/10 hover:text-fg"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const statusRef = useRef<HTMLDivElement>(null);
  // Each send returns a new state object, so the toast shows again for every message.
  const [closedFor, setClosedFor] = useState<ContactState | null>(null);
  const toastOpen = state.status === "success" && closedFor !== state;

  useEffect(() => {
    if (state.status === "invalid" || state.status === "failure") statusRef.current?.focus();
    if (state.status !== "success") return;

    const timer = setTimeout(() => setClosedFor(state), TOAST_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    // React clears the fields after a successful send; after an error they are refilled from state.values.
    <form action={formAction} className="rounded-lg bg-surface p-6 text-fg sm:p-9">
      <SentToast open={toastOpen} onClose={() => setClosedFor(state)} />
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
