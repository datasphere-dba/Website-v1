import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

/**
 * "The company behind the classroom" section.
 * Matches the About artboard: heading on the left, a registration table on
 * the right with company name, address, trading hour, programmes and
 * learner portal.
 */
export function CompanySection() {
  const { legalName, trainerCentralUrl, address } = siteConfig;

  const rows: { label: string; value: string | ReactNode }[] = [
    { label: "Registered name", value: legalName },
    {
      label: "Registered office",
      value: `${address.street}, ${address.city} ${address.postalCode}`,
    },
    { label: "Training since", value: "[YEAR]" },
    {
      label: "Programs",
      value: "2 packages · 3 expert tracks · dbaStanza modules",
    },
    {
      label: "Learner portal",
      value: (
        <a
          href={trainerCentralUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green underline-offset-2 hover:underline"
        >
          training.datasphere.co.in
        </a>
      ),
    },
  ];

  return (
    <section
      aria-labelledby="company-heading"
      className="py-16 sm:py-24"
    >
      <Container className="max-w-[1100px] px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          {/* Left heading */}
          <div className="lg:col-span-5">
            <h2
              id="company-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-ink"
            >
              The company behind the classroom.
            </h2>
          </div>

          {/* Right: registration table */}
          <div className="lg:col-span-7">
            <dl className="border-t-hairline border-b-hairline border-ink/20 divide-y divide-ink/10">
              {rows.map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-1 sm:gap-6 py-4 text-sm"
                >
                  <dt className="text-ink/60 font-sans">
                    {label}
                  </dt>
                  <dd className="text-ink font-normal">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
