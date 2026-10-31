"use client";

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, MessageCircle, MinusCircle, PlusCircle } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { isFrench } from "@/lib/i18n";
import { quoteInquirySchema, type QuoteInquiry } from "@/lib/validation";
import { getProduct } from "@/lib/products";
import { quoteWhatsAppMessage } from "@/lib/inquiries";
import { whatsappConfigured, whatsappLink } from "@/lib/site";
import { locationDetails } from "@/lib/locations";
import type { LocationSuggestion } from "@/lib/location-types";
import { MoqNotice } from "./ui";
import CountryCodeSelect from "./CountryCodeSelect";
import SearchableCountrySelect from "./SearchableCountrySelect";
import DestinationCombobox from "./DestinationCombobox";
import LocationMap from "./LocationMap";

type Success = { whatsappHref: string };

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
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Success | null>(null);
  const [destination, setDestination] = useState<LocationSuggestion | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

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
      destinationDetails: "",
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

  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  function onSubmit(data: QuoteInquiry, whatsappWindow: Window | null) {
    setServerError(null);
    if (!whatsappConfigured) {
      whatsappWindow?.close();
      setServerError(dict.contactPage.whatsappUnavailable);
      return;
    }

    const fullPhone = `${data.countryCode} ${data.phone.trim().replace(/^[+\s]+/, "")}`.trim();
    const submitted = { ...data, phone: fullPhone, locale };
    const formType = initialProduct ? "Enquiry" : "Request a Quote";
    const waHref = whatsappLink(quoteWhatsAppMessage(submitted, locale, formType));
    if (!waHref) {
      whatsappWindow?.close();
      setServerError(dict.contactPage.whatsappUnavailable);
      return;
    }

    if (whatsappWindow && !whatsappWindow.closed) {
      whatsappWindow.location.href = waHref;
    } else {
      window.open(waHref, "_blank", "noopener,noreferrer");
    }
    setSuccess({ whatsappHref: waHref });
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  if (success) {
    const q = dict.quotePage;
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="border border-leaf/40 bg-white/70 p-6 outline-none sm:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="flex items-center gap-2 text-leaf-deep">
          <CheckCircle2 className="size-6" aria-hidden />
          <span className="font-display text-2xl font-semibold text-bark">{q.successTitle}</span>
        </p>
        <p className="mt-2 text-[15px] text-ink-muted">{q.successLead}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={success.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle className="size-4" aria-hidden />
            {q.sendWhatsapp}
          </a>
          <button
            type="button"
            onClick={() => {
              setSuccess(null);
              setServerError(null);
              setDestination(null);
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
    <form onSubmit={handleSubmit} noValidate className="card-warm p-5 sm:p-8">
      <MoqNotice text={dict.moq.long} className="mb-6 border" />

      <fieldset>
        <legend className="font-display text-lg font-semibold text-bark">
          {f.details}
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
            <Controller
              name="destination"
              control={form.control}
              render={({ field }) => (
                <DestinationCombobox
                  id="destination"
                  value={field.value ?? ""}
                  selected={destination}
                  onChange={field.onChange}
                  onSelect={(location) => {
                    setDestination(location);
                    form.setValue(
                      "destinationDetails",
                      location ? locationDetails(location) : "",
                      { shouldValidate: false },
                    );
                  }}
                  locale={locale}
                  dict={dict}
                  invalid={!!errors.destination}
                  placeholder={isFrench(locale) ? "ex. Port d’Abidjan" : "e.g. Port of Rotterdam"}
                />
              )}
            />
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
          {destination ? (
            <div className="sm:col-span-2">
              <LocationMap location={destination} dict={dict} />
            </div>
          ) : null}
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
        <div className="mt-4 rounded-2xl border border-red-800/40 bg-red-50 p-4" role="alert" aria-live="assertive">
          <p className="text-sm text-red-900">{serverError}</p>
        </div>
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
        <div
          className="rounded-2xl border border-line bg-white/70 p-5 sm:p-8"
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">{dict.common.loadingForm}</span>
          <div className="grid gap-4 sm:grid-cols-2" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-24 rounded bg-parchment" />
                <div className="h-11 rounded-xl bg-parchment/80" />
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2" aria-hidden>
            <div className="h-3 w-32 rounded bg-parchment" />
            <div className="h-11 rounded-xl bg-parchment/80" />
          </div>
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
