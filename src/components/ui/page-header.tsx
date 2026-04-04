import { DragonPattern } from "@/components/cultural";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary to-dark py-20 overflow-hidden">
      <DragonPattern
        className="absolute top-0 right-0 w-1/2 h-full"
        color="#C8A951"
        opacity={0.04}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-black text-white">{title}</h1>
        {subtitle && (
          <p className="text-lg text-white/70 mt-3 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
