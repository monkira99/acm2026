import { Microscope, Mic, Users } from "lucide-react";

const highlights = [
  {
    icon: Microscope,
    title: "Scientific Sessions",
    description:
      "Cutting-edge research in microbial diversity, conservation, and biotechnology applications.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Mic,
    title: "Keynote Speakers",
    description:
      "World-renowned experts sharing insights on the future of microbial resources.",
    gradient: "from-gold to-[#DAB86A]",
  },
  {
    icon: Users,
    title: "Networking",
    description:
      "Connect with 150+ researchers and professionals from 15 Asian countries.",
    gradient: "from-accent to-[#0BC490]",
  },
];

export function Highlights() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} mx-auto mb-5 flex items-center justify-center`}
              >
                <item.icon size={24} className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-dark text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
