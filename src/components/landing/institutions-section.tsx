import Image from "next/image";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

const institutions = [
  {
    src: "/logo_imbt.png",
    alt: "Institute of Microbiology and Biotechnology (IMBT), VNU Hanoi",
    className: "h-8 w-auto max-w-full sm:h-14",
    width: 1578,
    height: 238,
  },
  {
    src: "/LogoVNU-2015.svg",
    alt: "Vietnam National University, Hanoi",
    className: "h-14 w-auto max-w-full sm:h-20",
    width: 200,
    height: 200,
  },
  {
    src: "/acm_logo.png",
    alt: "Asian Consortium for the Conservation and Sustainable Use of Microbial Resources",
    className: "h-9 w-auto max-w-full sm:h-16",
    width: 1280,
    height: 274,
  },
];

export function InstitutionsSection() {
  return (
    <Section id="organizers" tone="white">
      <SectionHeading
        align="center"
        eyebrow="Organized by"
        title="Hosted by the region's microbial institutions"
      />

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 rounded-2xl border border-[#E2E8F0] bg-[#FBFCFE] px-6 py-10 sm:gap-x-12 sm:px-8">
          {institutions.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={`${logo.className} object-contain`}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
