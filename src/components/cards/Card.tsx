import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  titleAccent?: "home" | "away" | "match" | "neutral";
  children: ReactNode;
};

const ACCENT_CLASSES: Record<NonNullable<CardProps["titleAccent"]>, string> = {
  home: "text-cyan",
  away: "text-red",
  match: "text-accent",
  neutral: "text-text-dim",
};

export function Card({ title, titleAccent = "neutral", children }: CardProps) {
  return (
    <section className="rounded-(--radius-card) border border-border bg-surface p-5 shadow-(--shadow-card)">
      {title ? (
        <h3
          className={`mb-4 border-b border-border pb-3 text-xs font-semibold uppercase tracking-[0.08em] ${ACCENT_CLASSES[titleAccent]}`}
        >
          {title}
        </h3>
      ) : null}
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
