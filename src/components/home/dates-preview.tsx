const milestones = [
  {
    date: "September 30, 2026",
    label: "Abstract submission",
    dotClass: "bg-[#2260AD]",
  },
  {
    date: "October 31, 2026",
    label: "Registration",
    dotClass: "bg-[#80AF41]",
  },
];

export function DatesPreview() {
  return (
    <section className="py-20 bg-[#EAF2FB]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-[#143D78]">
          Registration
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {milestones.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white px-6 py-8 text-center shadow-sm ring-1 ring-[#2260AD]/10"
            >
              <div
                className={`mx-auto mb-4 h-3.5 w-3.5 rounded-full ${item.dotClass}`}
                style={{ boxShadow: "0 0 0 6px #EAF2FB" }}
              />
              <div className="font-bold text-[#143D78]">{item.label}</div>
              <div className="mt-2 text-sm font-semibold text-[#2260AD]">
                {item.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
