"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, MinusCircle, PlusCircle } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { isFrench } from "@/lib/i18n";
import { quoteInquirySchema, type QuoteInquiry } from "@/lib/validation";
import { getProduct } from "@/lib/products";
import { quoteWhatsAppMessage } from "@/lib/inquiries";
import { site, whatsappConfigured, whatsappLink } from "@/lib/site";
import { MoqNotice } from "./ui";
import CountryCodeSelect from "./CountryCodeSelect";
import SearchableCountrySelect from "./SearchableCountrySelect";

type Success = { reference: string; emailed: boolean };

function errorText(dict: Dictionary, code?: string): string {
  const e = dict.quotePage.errors;
  switch (code) {
    case "email":
      return e.email;
    case "phone":
      return e.phone;
    case "min-containers":
      return e.minContainers;
    case "select-product":
      return e.selectProduct;
    case "at-least-one":
      return dict.quotePage.form.atLeastOne;
    default:
      return e.required;
  }
}

const inputCls =
  "min-h-11 w-full rounded-xl border border-bark/25 bg-cream px-3 py-2.5 text-[15px] text-bark placeholder:text-ink-muted/70 aria-[invalid=true]:border-red-700";
const labelCls = "text-xs font-bold tracking-wider text-ink-muted uppercase";
const errCls = "mt-1 text-sm font-medium text-red-800";

export function QuoteFormInner({
  locale,
  dict,
  productOptions,
  initialProduct,
}: {
  locale: Locale;
  dict: Dictionary;
  productOptions: { slug: string; name: string }[];
  initialProduct?: string;
}) {
  const f = dict.quotePage.form;
  const [serverError, setServerError] = useState(false);
  const [success, setSuccess] = useState<Success | null>(null);
  const [submitted, setSubmitted] = useState<QuoteInquiry | null>(null);

  const form = useForm<QuoteInquiry>({
    resolver: zodResolver(quoteInquirySchema),
    defaultValues: {
      kind: "quote",
      fullName: "",
      company: "",
      email: "",
      countryCode: "",
      phone: "",
      country: "",
      destination: "",
      timeframe: "",
      packaging: "",
      notes: "",
      items: [{ productSlug: initialProduct ?? "", containers: 1 }],
      locale,
      website: "",
    },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "items" });
  const { errors } = form.formState;

  async function onSubmit(data: QuoteInquiry) {
    setServerError(false);
    // Combine the selected dialing code with the local number so the
    // recorded phone is always a complete international number.
    const fullPhone = `${data.countryCode} ${data.phone.trim().replace(/^[+\s]+/, "")}`.trim();
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phone: fullPhone, locale }),
      });
      const json = (await res.json()) as { ok: boolean; reference?: string; emailed?: boolean };
      if (res.ok && json.ok && json.reference) {
        setSubmitted({ ...data, phone: fullPhone });
        setSuccess({ reference: json.reference, emailed: !!json.emailed });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setServerError(true);
      }
    } catch {
      setServerError(true);
    }
  }

  if (success && submitted) {
    const q = dict.quotePage;
    const waMessage = quoteWhatsAppMessage(success.reference, submitted, locale);
    const waHref = whatsappLink(waMessage);
    const mailSubject = encodeURIComponent(`[${success.reference}] Bulk quote request — ${submitted.fullName}`);
    const mailBody = encodeURIComponent(
      `${isFrench(locale) ? "Bonjour HB33" : "Hello HB33"},\n\n${waMessage}`,
    );
    return (
      <div className="border border-leaf/40 bg-white/70 p-6 sm:p-8" role="status">
        <p className="flex items-center gap-2 text-leaf-deep">
          <CheckCircle2 className="size-6" aria-hidden />
          <span className="font-display text-2xl font-semibold text-bark">{q.successTitle}</span>
        </p>
        <p className="mt-2 text-[15px] text-ink-muted">{q.successLead}</p>
        <div className="mt-5 border border-line bg-parchment p-4">
          <p className="text-xs font-bold tracking-wider text-ink-muted uppercase">{q.reference}</p>
          <p className="font-display mt-1 text-3xl font-bold tracking-wide text-cocoa" aria-live="polite">
            {success.reference}
          </p>
        </div>
        <h2 className="mt-6 font-display text-lg font-semibold text-bark">{q.nextStepsTitle}</h2>
        <ol className="mt-2 list-decimal space-y-1.5 ps-5 text-[15px] text-ink-muted">
          {q.nextSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <p className="mt-4 border-s-2 border-gold bg-parchment/60 px-3 py-2 text-sm text-ink-muted">
          {success.emailed ? q.emailStatusOn : q.emailStatusOff}
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={`mailto:${site.email}?subject=${mailSubject}&body=${mailBody}`}
            className="btn-primary"
          >
            {q.sendEmail}
          </a>
          {whatsappConfigured && waHref ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              {q.sendWhatsapp}
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setSuccess(null);
              setSubmitted(null);
              form.reset();
            }}
            className="inline-flex min-h-11 items-center justify-center px-4 py-3 text-sm font-semibold text-ink-muted underline underline-offset-4 hover:text-bark"
          >
            {q.newInquiry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="card-warm p-5 sm:p-8">
      <MoqNotice text={dict.moq.long} className="mb-6 border" />

      <fieldset>
        <legend className="font-display text-lg font-semibold text-bark">
          {dict.contactPage.formTitle}
        </legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelCls}>
              {f.fullName} <span aria-hidden className="text-clay-deep">*</span>
            </label>
            <input id="fullName" autoComplete="name" className={inputCls} aria-invalid={!!errors.fullName} {...form.register("fullName")} />
            {errors.fullName ? <p className={errCls} role="alert">{errorText(dict, errors.fullName.message)}</p> : null}
          </div>
          <div>
            <label htmlFor="company" className={labelCls}>
              {f.company} <span className="font-normal normal-case">({dict.common.optional})</span>
            </label>
            <input id="company" autoComplete="organization" className={inputCls} {...form.register("company")} />
          </div>
          <div>
            <label htmlFor="email" className={labelCls}>
              {f.email} <span aria-hidden className="text-clay-deep">*</span>
            </label>
            <input id="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} {...form.register("email")} />
            {errors.email ? <p className={errCls} role="alert">{errorText(dict, errors.email.message)}</p> : null}
          </div>
          <div className="sm:col-span-2">
            <div className="grid gap-4 sm:grid-cols-[11rem_1fr]">
              <div>
                <label htmlFor="countryCode" className={labelCls}>
                  {f.countryCode} <span aria-hidden className="text-clay-deep">*</span>
                </label>
                <Controller
                  name="countryCode"
                  control={form.control}
                  render={({ field }) => (
                    <CountryCodeSelect
                      id="countryCode"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      locale={locale}
                      placeholder={f.selectCode}
                      invalid={!!errors.countryCode}
                    />
                  )}
                />
                {errors.countryCode ? <p className={errCls} role="alert">{errorText(dict, errors.countryCode.message)}</p> : null}
              </div>
              <div>
                <label htmlFor="phone" className={labelCls}>
                  {f.phone} <span aria-hidden className="text-clay-deep">*</span>
                </label>
                <input id="phone" type="tel" autoComplete="tel" placeholder="24 123 4567" className={inputCls} aria-invalid={!!errors.phone} {...form.register("phone")} />
                {errors.phone ? <p className={errCls} role="alert">{errorText(dict, errors.phone.message)}</p> : null}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="country" className={labelCls}>
              {f.country} <span aria-hidden className="text-clay-deep">*</span>
            </label>
            <Controller
              name="country"
              control={form.control}
              render={({ field }) => (
                <SearchableCountrySelect
                  id="country"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  locale={locale}
                  placeholder={f.searchCountryPlaceholder}
                  noMatchText={f.noCountryMatch}
                  invalid={!!errors.country}
                />
              )}
            />
            {errors.country ? <p className={errCls} role="alert">{errorText(dict, errors.country.message)}</p> : null}
          </div>
          <div>
            <label htmlFor="destination" className={labelCls}>
              {f.destination} <span aria-hidden className="text-clay-deep">*</span>
            </label>
            <input id="destination" placeholder={isFrench(locale) ? "ex. Port d’Abidjan" : "e.g. Port of Rotterdam"} className={inputCls} aria-invalid={!!errors.destination} {...form.register("destination")} />
            {errors.destination ? <p className={errCls} role="alert">{errorText(dict, errors.destination.message)}</p> : null}
          </div>
          <div>
            <label htmlFor="timeframe" className={labelCls}>
              {f.timeframe} <span aria-hidden className="text-clay-deep">*</span>
            </label>
            <select id="timeframe" className={inputCls} aria-invalid={!!errors.timeframe} {...form.register("timeframe")}>
              <option value="">—</option>
              <option value="asap">{f.timeframeOptions.asap}</option>
              <option value="1-month">{f.timeframeOptions.oneMonth}</option>
              <option value="1-3-months">{f.timeframeOptions.oneToThree}</option>
              <option value="flexible">{f.timeframeOptions.flexible}</option>
            </select>
            {errors.timeframe ? <p className={errCls} role="alert">{errorText(dict, errors.timeframe.message)}</p> : null}
          </div>
          <div>
            <label htmlFor="packaging" className={labelCls}>
              {f.packaging} <span className="font-normal normal-case">({dict.common.optional})</span>
            </label>
            <input id="packaging" placeholder={f.packagingPlaceholder} className={inputCls} {...form.register("packaging")} />
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-display text-lg font-semibold text-bark">
          {f.items} <span aria-hidden className="text-clay-deep">*</span>
        </legend>
        <div className="mt-4 space-y-4">
          {fields.map((field, i) => {
            const itemError = errors.items?.[i];
            return (
              <div key={field.id} className="grid gap-3 rounded-2xl border border-line bg-cream/60 p-4 sm:grid-cols-[1fr_9rem_auto] sm:items-end">
                <div>
                  <label htmlFor={`items-${i}-product`} className={labelCls}>
                    {f.product}
                  </label>
                  <select
                    id={`items-${i}-product`}
                    className={`${inputCls} mt-1`}
                    aria-invalid={!!itemError?.productSlug}
                    {...form.register(`items.${i}.productSlug` as const)}
                  >
                    <option value="">{f.selectProduct}</option>
                    {productOptions.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {itemError?.productSlug ? (
                    <p className={errCls} role="alert">{errorText(dict, itemError.productSlug.message)}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor={`items-${i}-containers`} className={labelCls}>
                    {f.quantityContainers} <span className="font-normal normal-case">(≥ 1)</span>
                  </label>
                  <input
                    id={`items-${i}-containers`}
                    type="number"
                    min={1}
                    max={500}
                    step={1}
                    className={`${inputCls} mt-1`}
                    aria-invalid={!!itemError?.containers}
                    {...form.register(`items.${i}.containers` as const, { valueAsNumber: true })}
                  />
                  {itemError?.containers ? (
                    <p className={errCls} role="alert">{errorText(dict, itemError.containers.message)}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  disabled={fields.length <= 1}
                  className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm font-semibold text-ink-muted underline underline-offset-4 hover:text-red-800 disabled:opacity-40"
                  aria-label={`${f.removeProduct} ${i + 1}`}
                >
                  <MinusCircle className="size-4" aria-hidden />
                  {f.removeProduct}
                </button>
              </div>
            );
          })}
        </div>
        {typeof errors.items?.message === "string" ? (
          <p className={errCls} role="alert">{errorText(dict, errors.items.message)}</p>
        ) : null}
        <button
          type="button"
          onClick={() => append({ productSlug: "", containers: 1 })}
          className="btn-outline mt-3"
        >
          <PlusCircle className="size-4" aria-hidden />
          {f.addProduct}
        </button>
        <p className="mt-2 text-xs text-ink-muted">{dict.common.tonnageNote}</p>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="notes" className={labelCls}>
          {f.notes} <span className="font-normal normal-case">({dict.common.optional})</span>
        </label>
        <textarea id="notes" rows={4} placeholder={f.notesPlaceholder} className={`${inputCls} mt-1`} {...form.register("notes")} />
      </div>

      {serverError ? (
        <p className="mt-4 border border-red-800/40 bg-red-50 p-3 text-sm font-medium text-red-900" role="alert">
          {dict.quotePage.failTitle} {dict.quotePage.failText}
        </p>
      ) : null}

      {/* Honeypot: hidden from people, catches bots. Leave empty. */}
      <div aria-hidden="true" className="absolute top-0 -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="quote-website">Website</label>
        <input
          id="quote-website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...form.register("website")}
        />
      </div>

      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="btn-primary mt-6 w-full sm:w-auto sm:min-w-64 disabled:opacity-60"
      >
        {form.formState.isSubmitting ? f.submitting : f.submit}
      </button>
    </form>
  );
}

export default function QuoteForm(props: {
  locale: Locale;
  dict: Dictionary;
  products: { slug: string; name: string }[];
  initialProduct?: string;
}) {
  const validInitial =
    props.initialProduct && getProduct(props.initialProduct) ? props.initialProduct : undefined;
  return (
    <Suspense>
      <QuoteFormInner
        locale={props.locale}
        dict={props.dict}
        productOptions={props.products}
        initialProduct={validInitial}
      />
    </Suspense>
  );
}

/** Reads ?product=<slug> on the client so the page stays prerenderable. */
export function QuoteSection({
  locale,
  dict,
  products,
}: {
  locale: Locale;
  dict: Dictionary;
  products: { slug: string; name: string }[];
}) {
  return (
    <Suspense
      fallback={
        <div className="border border-line bg-white/70 p-8" role="status" aria-live="polite">
          {dict.common.sending}
        </div>
      }
    >
      <QuoteSectionInner locale={locale} dict={dict} products={products} />
    </Suspense>
  );
}

function QuoteSectionInner({
  locale,
  dict,
  products,
}: {
  locale: Locale;
  dict: Dictionary;
  products: { slug: string; name: string }[];
}) {
  const searchParams = useSearchParams();
  const raw = searchParams.get("product");
  const validInitial = raw && getProduct(raw) ? raw : undefined;
  return (
    <QuoteFormInner
      locale={locale}
      dict={dict}
      productOptions={products}
      initialProduct={validInitial}
    />
  );
}
