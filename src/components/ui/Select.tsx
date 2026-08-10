import { ChevronDown } from 'lucide-react';

import type { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SelectOption[];
  ariaLabel?: string;
}

export function Select({
  options,
  className = '',
  ariaLabel,
  ...rest
}: SelectProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        aria-label={ariaLabel}
        className="w-full appearance-none rounded-lg border border-border bg-surface-2 px-3 py-2 pr-9 text-sm text-text outline-none transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim"
      />
    </div>
  );
}