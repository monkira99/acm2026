import { Dna, Users, Database, Sprout } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

/** Objectives drawn directly from the welcome letter — no invented claims. */
const objectives = [
  {
    icon: Dna,
    title: "Exchange the science",
    body: "Keynote lectures, invited talks, and oral presentations on microbial diversity, ecology, biotechnology, and microbiomes.",
  },
  {
    icon: Users,
    title: "Build collaborations",
    body: "An interdisciplinary platform for junior and senior scientists to share advances and shape future joint work across Asia.",
  },
  {
    icon: Database,
    title: "Strengthen collections",
    body: "Poster sessions for ACM members to report and exchange culture-collection activities and strengthen regional networks.",
  },
  {
    icon: Sprout,
    title: "Experience Hanoi",
    body: "Time to enjoy the culture and hospitality of Hanoi, Vietnam, alongside the scientific programme.",
  },
];

export function AboutSection() {
  return (
    <Section id="about" tone="white">
      <SectionHeading
        eyebrow="The meeting"
        title="A regional platform for microbial science"
        intro="Since its founding, ACM has advanced regional collaboration, scientific exchange, and capacity building in the conservation and sustainable use of microbial resources across Asia. ACM23 brings microbiologists together to address shared challenges — from environmental protection and the circular economy to sustainable agriculture, aquaculture, food safety, human health, and One Health."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[#E2E8F0] sm:grid-cols-2 lg:grid-cols-4">
        {objectives.map((item, i) => (
          <Reveal as="div" key={item.title} delay={i * 0.06} className="h-full">
            <div className="flex h-full flex-col bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FB] text-[#2260AD]">
                <item.icon size={20} aria-hidden="true" />
              </span>
              <h3 className="lp-display mt-5 text-lg font-semibold text-[#143D78]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5A6B80]">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
