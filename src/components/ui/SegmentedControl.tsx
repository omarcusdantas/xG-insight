interface SegmentedOption<T extends string | number> {
  value: T;
  label: string;
}

type Size = "sm" | "md";

interface SegmentedControlProps<T extends string | number> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
  size?: Size;
}

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  ariaLabel,
  className = "",
  size = "sm",
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`flex w-full overflow-hidden rounded-lg ${className}`}
    >
      {options.map((opt, idx) => {
        const isActive = opt.value === value;
        const baseBtn = `flex-1 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${sizeStyles[size]}`;
        const styles = isActive
          ? "bg-accent text-white border border-accent"
          : "bg-accent/60 text-white border border-accent hover:bg-accent/70";
        const radius =
          idx === 0 ? "rounded-l-lg" : idx === options.length - 1 ? "rounded-r-lg" : "";
        return (
          <button
            key={String(opt.value)}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            className={`${baseBtn} ${styles} ${radius}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
