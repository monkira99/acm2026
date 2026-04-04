import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { LotusDecor } from "@/components/cultural";

export const metadata: Metadata = {
  title: "About ACM",
  description: "Learn about the Asian Consortium for the Conservation and Sustainable Use of Microbial Resources.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About ACM"
        subtitle="Asian Consortium for the Conservation and Sustainable Use of Microbial Resources"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <LotusDecor color="#0D7377" size={24} />
            <h2 className="text-2xl font-bold text-dark">History</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            In 2004, at Tsukuba, Japan, the ACM was established with representatives
            from 12 Asian countries (Cambodia, China, Indonesia, Japan, Korea, Laos,
            Malaysia, Mongolia, Myanmar, Philippines, Thailand and Vietnam),
            simultaneously held at the 10th International Congress on Culture
            Collections (ICCC-10). Currently, 28 organizations across 15
            countries/regions are members of the consortium.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <LotusDecor color="#C8A951" size={24} />
            <h2 className="text-2xl font-bold text-dark">Objectives</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            The objective of the Consortium is to promote collaboration among
            government or public organizations in Asian countries for the purposes
            of enhancing conservation and sustainable use of microbial resources in Asia.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <LotusDecor color="#0AD3A1" size={24} />
            <h2 className="text-2xl font-bold text-dark">Activities</h2>
          </div>
          <ul className="space-y-3 text-gray-600">
            {[
              "Collaborate among biological resource centers",
              "Promote research and development of microbial resources for industrial purposes",
              "Enhance awareness of ACM activities",
              "Develop human resources",
              "Exchange perspectives and information",
              "Arrange scientific meetings",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
