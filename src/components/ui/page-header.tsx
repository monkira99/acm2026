import { SectionHero } from "./section-hero";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return <SectionHero title={title} subtitle={subtitle} />;
}
