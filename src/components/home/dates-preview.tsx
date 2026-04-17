const milestones = [
  {
    date: "July 15, 2026",
    label: "Abstract Submission Deadline",
    dotClass: "bg-gold",
  },
  {
    date: "August 31, 2026",
    label: "Early Bird Registration",
    dotClass: "bg-secondary",
  },
  {
    date: "September 15, 2026",
    label: "Acceptance Notification",
    dotClass: "bg-accent",
  },
  {
    date: "October 2026",
    label: "Conference in Hanoi",
    dotClass: "bg-primary",
  },
];

export function DatesPreview() {
  return (
    <section className="py-20 bg-light">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-dark text-center mb-12">
          Important Dates
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {milestones.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white px-6 py-8 text-center shadow-sm ring-1 ring-gray-100"
            >
              <div
                className={`mx-auto mb-4 h-3.5 w-3.5 rounded-full ${item.dotClass}`}
                style={{ boxShadow: "0 0 0 6px #F5F7FA" }}
              />
              <div className="font-bold text-dark">{item.label}</div>
              <div className="mt-2 text-sm font-semibold text-primary">
                {item.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
