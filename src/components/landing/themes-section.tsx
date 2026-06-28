import {
  Leaf,
  Recycle,
  Wheat,
  Beef,
  Fish,
  ShieldCheck,
  HeartPulse,
  Globe2,
} from "lucide-react";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

/** The eight application themes named in the call for abstracts. */
const themes = [
  { icon: Leaf, label: "Environmental protection" },
  { icon: Recycle, label: "Circular economy" },
  { icon: Wheat, label: "Sustainable crop production" },
  { icon: Beef, label: "Livestock production" },
  { icon: Fish, label: "Blue aquaculture" },
  { icon: ShieldCheck, label: "Food safety" },
  { icon: HeartPulse, label: "Human health" },
  { icon: Globe2, label: "One Health" },
];

export function ThemesSection() {
  return (
    <Section id="themes" tone="tint">
      <SectionHeading
        eyebrow="Research themes"
        title="From single cells to microbiomes"
        intro="The programme spans microbial diversity, ecology, biotechnology, and microbiomes — applied across eight areas where microbial resources drive a sustainable bioeconomy."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {themes.map((theme, i) => (
          <Reveal as="div" key={theme.label} delay={(i % 4) * 0.06}>
            <article className="group flex h-full flex-col justify-between rounded-2xl border border-[#D6E2F2] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#80AF41]/50 hover:shadow-lg hover:shadow-[#2260AD]/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FB] text-[#2260AD] transition-colors group-hover:bg-[#80AF41]/12 group-hover:text-[#5C7E2C]">
                <theme.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="lp-display mt-8 text-base font-semibold leading-snug text-[#143D78]">
                {theme.label}
              </h3>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
