export function SponsorsStrip() {
  const placeholders = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs tracking-[0.2em] text-gray-400 font-semibold uppercase">
          Our Sponsors &amp; Partners
        </span>
        <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
          {placeholders.map((n) => (
            <div
              key={n}
              className="w-28 h-14 rounded-lg bg-light border border-gray-100 flex items-center justify-center text-xs text-gray-300"
            >
              Logo {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
