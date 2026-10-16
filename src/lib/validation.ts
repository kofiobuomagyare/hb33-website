import { z } from "zod";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-().]{5,25}$/;

/**
 * Shared client + server validation. Only stable zod APIs are used so the
 * schemas behave identically on both sides.
 *
 * Both forms carry a `website` honeypot: real users never see it (it is
 * visually hidden and excluded from tab order), so any submitted value
 * means an automated bot and the server rejects the payload.
 */
const honeypot = z.string().max(0, "spam").optional().or(z.literal(""));
export const inquiryItemSchema = z.object({
  productSlug: z.string().min(1, "select-product"),
  containers: z.number().int("min-containers").min(1, "min-containers").max(500, "min-containers"),
});

export const quoteInquirySchema = z.object({
  kind: z.literal("quote"),
  fullName: z.string().trim().min(2, "required"),
  company: z.string().trim().max(160, "required").optional().or(z.literal("")),
  email: z.string().trim().min(1, "required").regex(EMAIL_RE, "email"),
  countryCode: z.string().trim().min(1, "required").regex(/^\+\d{1,5}$/, "phone"),
  phone: z.string().trim().min(1, "required").regex(PHONE_RE, "phone"),
  country: z.string().trim().min(2, "required"),
  destination: z.string().trim().min(2, "required"),
  timeframe: z.string().trim().min(1, "required"),
  packaging: z.string().trim().max(300, "required").optional().or(z.literal("")),
  notes: z.string().trim().max(4000, "required").optional().or(z.literal("")),
  items: z.array(inquiryItemSchema).min(1, "at-least-one").max(20, "at-least-one"),
  locale: z.string().min(2).max(5).optional().or(z.literal("")),
  website: honeypot,
});

export type QuoteInquiry = z.infer<typeof quoteInquirySchema>;

export const contactMessageSchema = z.object({
  kind: z.literal("contact"),
  name: z.string().trim().min(2, "required"),
  email: z.string().trim().min(1, "required").regex(EMAIL_RE, "email"),
  subject: z.string().trim().min(2, "required"),
  message: z.string().trim().min(10, "message-short"),
  locale: z.string().min(2).max(5).optional().or(z.literal("")),
  website: honeypot,
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;
