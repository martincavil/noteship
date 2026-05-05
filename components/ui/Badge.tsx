interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "muted";
}

export function Badge({ children, variant = "accent" }: BadgeProps) {
  if (variant === "muted") {
    return (
      <span className="inline-flex items-center border border-[#333] text-tertiary rounded-full px-2.5 py-0.5 text-xs font-medium">
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center border border-accent text-accent rounded-full px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );
}
