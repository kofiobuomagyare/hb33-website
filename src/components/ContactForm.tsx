"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, MessageCircle } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { isFrench } from "@/lib/i18n";
import { contactMessageSchema, type ContactMessage } from "@/lib/validation";
import { whatsappConfigured, whatsappLink } from "@/lib/site";

const inputCls =
  "min-h-11 w-full rounded-xl border border-bark/25 bg-cream px-3 py-2.5 text-[15px] text-bark placeholder:text-ink-muted/70 aria-[invalid=true]:border-red-700";
const labelCls = "text-xs font-bold tracking-wider text-ink-muted uppercase";
const errCls = "mt-1 text-sm font-medium text-red-800";

export default function ContactForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const f = dict.contactPage.form;
  const fs = dict.formStatus;
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [waHref, setWaHref] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  const form = useForm<ContactMessage>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: { kind: "contact", name: "", email: "", subject: "", message: "", locale, website: "" },
  });
  const { errors } = form.formState;

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  function msg(code?: string): string {
    const e = dict.contactPage.errors;
    if (code === "email") return e.email;
    if (code === "message-short") return e.messageShort;
    return e.required;
  }

  function onSubmit(data: ContactMessage, whatsappWindow: Window | null) {
    setServerError(null);
    if (!whatsappConfigured) {
      whatsappWindow?.close();
      setServerError(dict.contactPage.whatsappUnavailable);
      return;
    }

    const message = [
      isFrench(locale) ? "Bonjour HB33 — Formulaire de contact" : "Hello HB33 — Contact Form",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Subject: ${data.subject}`,
      "",
      data.message,
    ].join("\n");
    const href = whatsappLink(message);
    if (!href) {
      whatsappWindow?.close();
      setServerError(dict.contactPage.whatsappUnavailable);
      return;
    }

    setWaHref(href);
    if (whatsappWindow && !whatsappWindow.closed) {
      whatsappWindow.location.href = href;
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
    setSent(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.formState.isSubmitting) return;
    // Reserve a tab during the click gesture before asynchronous validation runs.
    const whatsappWindow = whatsappConfigured ? window.open("about:blank", "_blank") : null;
    if (whatsappWindow) whatsappWindow.opener = null;
    void form.handleSubmit(
      (data) => onSubmit(data, whatsappWindow),
      () => whatsappWindow?.close(),
    )(event);
  }

  if (sent) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="border border-leaf/40 bg-white/70 p-6 outline-none sm:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="flex items-center gap-2">
          <CheckCircle2 className="size-6 text-leaf-deep" aria-hidden />
          <span className="font-display text-2xl font-semibold text-bark">
            {dict.contactPage.sentTitle}
          </span>
        </p>
        <p className="mt-2 text-[15px] text-ink-muted">{dict.contactPage.sentText}</p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-5"
        >
          <MessageCircle className="size-4" aria-hidden />
          {fs.whatsappFallback}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-warm p-5 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelCls}>
            {f.name} <span aria-hidden className="text-clay-deep">*</span>
          </label>
          <input id="contact-name" autoComplete="name" className={inputCls} aria-invalid={!!errors.name} {...form.register("name")} />
          {errors.name ? <p className={errCls} role="alert">{msg(errors.name.message)}</p> : null}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelCls}>
            {f.email} <span aria-hidden className="text-clay-deep">*</span>
          </label>
          <input id="contact-email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} {...form.register("email")} />
          {errors.email ? <p className={errCls} role="alert">{msg(errors.email.message)}</p> : null}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="contact-subject" className={labelCls}>
          {f.subject} <span aria-hidden className="text-clay-deep">*</span>
        </label>
        <input id="contact-subject" className={inputCls} aria-invalid={!!errors.subject} {...form.register("subject")} />
        {errors.subject ? <p className={errCls} role="alert">{msg(errors.subject.message)}</p> : null}
      </div>
      <div className="mt-4">
        <label htmlFor="contact-message" className={labelCls}>
          {f.message} <span aria-hidden className="text-clay-deep">*</span>
        </label>
        <textarea id="contact-message" rows={5} placeholder={f.messagePlaceholder} className={`${inputCls} mt-0`} aria-invalid={!!errors.message} {...form.register("message")} />
        {errors.message ? <p className={errCls} role="alert">{msg(errors.message.message)}</p> : null}
      </div>

      {serverError ? (
        <div className="mt-4 rounded-2xl border border-red-800/40 bg-red-50 p-4" role="alert" aria-live="assertive">
          <p className="text-sm text-red-900">{serverError}</p>
        </div>
      ) : null}

      {/* Honeypot: hidden from people, catches bots. Leave empty. */}
      <div aria-hidden="true" className="absolute top-0 -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...form.register("website")}
        />
      </div>
      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="btn-primary mt-6 w-full sm:w-auto sm:min-w-56 disabled:opacity-60"
      >
        {form.formState.isSubmitting ? dict.common.sending : f.submit}
      </button>
    </form>
  );
}
