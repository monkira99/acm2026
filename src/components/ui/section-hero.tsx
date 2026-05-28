interface SectionHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

export function SectionHero({
  title,
  subtitle,
  eyebrow = "ACM23 Hanoi",
}: SectionHeroProps) {
  return (
    <section className="bg-[linear-gradient(135deg,#2260AD_0%,#2D78D4_58%,#143D78_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-1.5 w-14 rounded-full bg-white" />
          <span className="h-1.5 w-6 rounded-full bg-[#80AF41]" />
        </div>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-white/80">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-lg text-white/75">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
