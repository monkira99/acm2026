import type { Metadata } from "next";
import { LotusDecor } from "@/components/cultural";

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

export default function WelcomePage() {
  return (
    <div className="bg-white">
      <section className="border-b border-[#2260AD]/10 bg-[#F6F9FD]">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-1.5 w-12 rounded-full bg-[#80AF41]" />
            <span className="h-1.5 w-6 rounded-full bg-[#C8A951]" />
          </div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#80AF41]">
            ACM23 Hanoi
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-[#143D78] sm:text-5xl">
            Welcome
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            A message from the ACM23 Organizing Committee
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 flex items-center gap-3 text-[#C8A951]">
          <LotusDecor color="#C8A951" size={28} />
          <span className="h-px flex-1 bg-[#C8A951]/40" />
        </div>

        <p className="mb-8 text-xl font-semibold text-[#143D78]">
          Dear colleagues and friends,
        </p>

        <div className="space-y-7">
          <p className="border-l-4 border-[#80AF41] pl-6 text-xl leading-9 text-[#143D78] sm:text-2xl sm:leading-10">
            {letterParagraphs[0]}
          </p>

          {letterParagraphs.slice(1).map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-8 text-slate-700 sm:text-lg sm:leading-9"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <footer className="mt-12 border-l-4 border-[#C8A951] bg-[#F6F9FD] px-6 py-6">
          <p className="text-base leading-7 text-slate-700">Best regards,</p>
          <p className="mt-4 text-xl font-bold text-[#143D78]">Trung</p>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#80AF41]">
            Chair of the Organizing Committee
          </p>
        </footer>
      </article>
    </div>
  );
}
