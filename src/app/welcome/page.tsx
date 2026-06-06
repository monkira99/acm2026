import type { Metadata } from "next";
import Image from "next/image";
import { SectionHero } from "@/components/ui/section-hero";

export const metadata: Metadata = {
  title: "Welcome",
  description:
    "Welcome letter from the ACM23 Organizing Committee for the Hanoi 2026 meeting.",
};

const letterParagraphs = [
  "On behalf of the Organizing Committee, it is my great pleasure to welcome you to the 23rd Annual Meeting of the Asian Consortium for the Conservation and Sustainable Use of Microbial Resources (ACM23), which will be held in Hanoi, Vietnam, in November 2026.",
  "Since its establishment, ACM has played an important role in promoting regional collaboration, scientific exchange, and capacity building in the conservation and sustainable utilization of microbial resources across Asian countries. Under the theme “Harnessing Microbial Resources: From Single Cells to Microbiomes toward a Sustainable Bioeconomy”, ACM23 will bring together scientists from diverse fields of microbiology to address global challenges related to environmental protection, circular economy, sustainable crop and livestock production, blue aquaculture, food safety, human health, and One Health. The meeting will provide an interdisciplinary platform for sharing recent scientific advances, innovative technologies, and opportunities for future collaboration.",
  "The scientific program will include keynote lectures, invited talks, and oral presentations from both junior and senior scientists, covering a broad range of topics related to microbial diversity, microbial ecology, microbial biotechnology, microbiomes, and the sustainable applications of microbial resources. We are honored to welcome distinguished scientists and experts from many countries who will contribute to the success of the meeting. Poster presentations will be for ACM members to report and exchange information on microbial culture collection activities.",
  "We hope that ACM23 will further strengthen regional culture collection networks, foster new collaborations, and provide participants with an opportunity to experience the culture and hospitality of Hanoi, Vietnam.",
  "We sincerely thank all members of the Scientific Committee, invited speakers, sponsors, partners, and participants for their valuable support and contributions. We look forward to welcoming you to Hanoi for a fruitful and inspiring ACM23 meeting.",
];

const letterTextClass =
  "text-base leading-8 text-[#263D5C] sm:text-lg sm:leading-9";

export default function WelcomePage() {
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Welcome letter" />

      <article className="mx-auto max-w-4xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
        <div className="mb-8 flex justify-start">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-[#F3F7FC] shadow-lg shadow-[#2260AD]/15 ring-1 ring-[#2260AD]/15 sm:h-32 sm:w-32">
            <Image
              src="/images/welcome/Dr.Trinh_Thanh_Trung.webp"
              alt="Dr. Trinh Thanh Trung"
              fill
              sizes="(min-width: 640px) 128px, 112px"
              unoptimized
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-7">
          <p className={letterTextClass}>Dear colleagues and friends,</p>

          {letterParagraphs.map((paragraph) => (
            <p key={paragraph} className={letterTextClass}>
              {paragraph}
            </p>
          ))}

          <div className="space-y-0 pt-5">
            <p className={letterTextClass}>Best regards,</p>
            <p className={letterTextClass}>Trinh Thanh Trung</p>
            <p className={letterTextClass}>
              Chair of the Organizing Committee
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
