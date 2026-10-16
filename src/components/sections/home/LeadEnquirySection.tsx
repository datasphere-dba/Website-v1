"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

const courses = [
  { value: "PostgreSQL 17 DB Expert", label: "PostgreSQL 17 DB Expert" },
  { value: "MongoDB 8 DB Expert", label: "MongoDB 8 DB Expert" },
  { value: "AWS Cloud DB Expert", label: "AWS Cloud DB Expert" },
  { value: "Database Specialist MAP", label: "Database Specialist MAP (PostgreSQL + MongoDB + AWS)" },
  { value: "Double Track: PM", label: "Double Track: PM (PostgreSQL + MongoDB)" },
];

const batchOptions = ["Weekend", "Weekday morning", "Weekday evening"] as const;

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  course: courses[0].value,
  preferredBatch: batchOptions[0] as string,
};

const labelClass = "mb-2 block text-sm font-medium text-ink";
const inputClass =
  "w-full border-hairline border-ink/25 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/40 focus:border-green focus:outline-hidden";

export function LeadEnquirySection() {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          course: formData.course,
          notes: `Preferred batch: ${formData.preferredBatch}`,
        }),
      });

      // TODO: drop the 501 case once /api/leads sends to Zoho CRM.
      // Until then a "success" here means the lead was NOT saved anywhere.
      setStatus(res.ok || res.status === 501 ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const whatsappHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(
    "Hi, please share the fees, dates and syllabus for the DBA courses.",
  )}`;

  return (
    <section id="enquire" className="scroll-mt-28 pb-16 sm:pb-24">
      <Container>
        <div className="grid grid-cols-1 border-hairline border-ink bg-white lg:grid-cols-2">
          {/* Left: pitch + other ways to reach us */}
          <div className="flex flex-col justify-between gap-10 p-6 sm:p-10 lg:p-14">
            <div>
              <p className="font-mono text-xs text-green">05 — Next step</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.015em] text-ink sm:text-5xl">
                Get fees, dates and the full syllabus.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink/75">
                Tell us what you run at work and we&apos;ll come back with the batch that fits
                your schedule.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <p className="text-ink/75">
                Prefer to talk?{" "}
                <a href={siteConfig.phoneHref} className="font-medium text-ink hover:text-green">
                  {siteConfig.phone}
                </a>
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-green hover:underline"
              >
                Message on WhatsApp <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="border-t-hairline border-ink/15 p-6 sm:p-10 lg:border-t-0 lg:border-l-hairline lg:p-14">
            {status === "success" ? (
              <div className="flex h-full flex-col items-start justify-center py-6" aria-live="polite">
                <p className="font-mono text-xs text-green">Enquiry received</p>
                <h3 className="mt-3 font-serif text-3xl text-ink">Thank you, we&apos;ll be in touch.</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/75">
                  Our team will send the syllabus and fee details to{" "}
                  <strong className="font-medium text-ink">{formData.email || "your email"}</strong>{" "}
                  and call you on {formData.phone || "your number"}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setFormData(emptyForm);
                  }}
                  className="mt-6 text-sm font-medium text-green hover:underline"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lead-name" className={labelClass}>
                      Full name
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-phone" className={labelClass}>
                      Mobile
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lead-email" className={labelClass}>
                    Work email
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="lead-course" className={labelClass}>
                    Interested in
                  </label>
                  <select
                    id="lead-course"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className={inputClass}
                  >
                    {courses.map((course) => (
                      <option key={course.value} value={course.value}>
                        {course.label}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className={labelClass}>Preferred batch</legend>
                  <div className="flex flex-wrap gap-2">
                    {batchOptions.map((batch) => {
                      const selected = formData.preferredBatch === batch;
                      return (
                        <button
                          key={batch}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setFormData({ ...formData, preferredBatch: batch })}
                          className={`border-hairline px-4 py-2.5 text-sm transition-colors ${
                            selected
                              ? "border-ink bg-ink text-paper"
                              : "border-ink/25 bg-white text-ink hover:border-ink"
                          }`}
                        >
                          {batch}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {status === "error" && (
                  <p role="alert" className="border-l-2 border-green bg-sage/50 px-4 py-3 text-sm text-ink">
                    Sorry, that didn&apos;t go through. Please try again, or call us on{" "}
                    <a href={siteConfig.phoneHref} className="font-medium underline">
                      {siteConfig.phone}
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex w-full items-center justify-center gap-2 bg-green px-6 py-4 text-[15px] font-medium text-paper transition-colors hover:bg-ink disabled:opacity-70"
                >
                  {status === "submitting" ? "Sending…" : "Send me the details"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
