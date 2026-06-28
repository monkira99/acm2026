import Link from "next/link";
import { Mail, Globe, ArrowRight } from "lucide-react";
import { ColonyField } from "./colony-field";
import { Reveal } from "./reveal";

const CTA_GRADIENT = [
  "radial-gradient(ellipse 80% 90% at 85% 100%, rgba(128,175,65,0.3) 0%, rgba(128,175,65,0) 55%)",
  "linear-gradient(150deg, #0B284F 0%, #143D78 55%, #1B4E96 100%)",
].join(", ");

export function ContactCta() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
      style={{ backgroundImage: CTA_GRADIENT }}
    >
      <ColonyField
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        color="#ffffff"
        accentColor="#80AF41"
      />

      <div className="relative mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <p className="lp-mono flex items-center justify-center gap-2.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-white/60">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#80AF41]" aria-hidden="true" />
            See you in Hanoi
          </p>
          <h2 className="lp-display mt-5 text-3xl font-bold leading-tight text-white sm:text-5xl">
            Join ACM23, 16–18 November 2026
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Register to attend, submit your abstract, and be part of advancing
            microbial resources for a sustainable bioeconomy.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/registration"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#80AF41] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#80AF41]/20 transition-colors hover:bg-[#739D3B]"
            >
              Register now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/abstract"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Submit an abstract
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/15 pt-8 text-sm">
            <a
              href="mailto:acm23@vnu.edu.vn"
              className="inline-flex items-center gap-2 text-white/85 transition-colors hover:text-white"
            >
              <Mail size={16} className="text-[#80AF41]" aria-hidden="true" />
              acm23@vnu.edu.vn
            </a>
            <a
              href="http://imbt.vnu.edu.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/85 transition-colors hover:text-white"
            >
              <Globe size={16} className="text-[#80AF41]" aria-hidden="true" />
              imbt.vnu.edu.vn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
