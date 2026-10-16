export default function FaqList({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f, i) => (
        <details key={i} className="group py-4" name="faq">
          <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-2.5 text-start font-semibold text-bark marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="flex gap-3">
              <span aria-hidden className="font-display text-clay-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              {f.q}
            </span>
            <span aria-hidden className="text-xl leading-none text-clay-deep group-open:hidden">
              +
            </span>
            <span aria-hidden className="hidden text-xl leading-none text-clay-deep group-open:inline">
              −
            </span>
          </summary>
          <p className="mt-2 max-w-3xl ps-9 text-[15px] leading-relaxed text-ink-muted">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
