import { Badge } from "./Badge";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  comingSoon,
}: FeatureCardProps) {
  return (
    <div className="group relative bg-surface border border-edge rounded-xl p-6 hover:border-[#333] transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-surface-2 border border-edge flex items-center justify-center text-accent group-hover:border-accent/30 transition-colors duration-200">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white font-semibold text-base">{title}</h3>
            {comingSoon && (
              <Badge variant="muted">{comingSoon}</Badge>
            )}
          </div>
          <p className="text-secondary text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
