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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-dark text-center mb-12">
          Important Dates
        </h2>
        <div className="space-y-6">
          {milestones.map((item, i) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3.5 h-3.5 rounded-full ${item.dotClass}`}
                  style={{ boxShadow: "0 0 0 4px white" }}
                />
                {i < milestones.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-200 mt-1" />
                )}
              </div>
              <div>
                <div className="font-bold text-dark">{item.label}</div>
                <div className="text-sm text-primary font-semibold">
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
