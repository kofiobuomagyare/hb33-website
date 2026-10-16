"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { contactMessageSchema, type ContactMessage } from "@/lib/validation";

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
  const e = dict.contactPage.errors;
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const form = useForm<ContactMessage>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: { kind: "contact", name: "", email: "", subject: "", message: "", locale, website: "" },
  });
  const { errors } = form.formState;

  function msg(code?: string): string {
    if (code === "email") return e.email;
    if (code === "message-short") return e.messageShort;
    return e.required;
  }

  async function onSubmit(data: ContactMessage) {
    setFailed(false);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      const json = (await res.json()) as { ok: boolean };
      if (res.ok && json.ok) {
        setSent(true);
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    }
  }

  if (sent) {
    return (
      <div className="border border-leaf/40 bg-white/70 p-6 sm:p-8" role="status">
        <p className="flex items-center gap-2">
          <CheckCircle2 className="size-6 text-leaf-deep" aria-hidden />
          <span className="font-display text-2xl font-semibold text-bark">
            {dict.contactPage.sentTitle}
          </span>
        </p>
        <p className="mt-2 text-[15px] text-ink-muted">{dict.contactPage.sentText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="card-warm p-5 sm:p-8">
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
      {failed ? (
        <p className="mt-4 border border-red-800/40 bg-red-50 p-3 text-sm font-medium text-red-900" role="alert">
          {dict.contactPage.failText}
        </p>
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
