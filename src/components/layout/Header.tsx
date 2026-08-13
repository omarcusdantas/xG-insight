import { Link, useLocation } from "react-router";
import { Plus, SlidersHorizontal } from "lucide-react";
import { IconButton } from "../ui/IconButton";
import { useTranslation } from "react-i18next";

type HeaderProps = {
  onOpenFilters: () => void;
};

export function Header({ onOpenFilters }: HeaderProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const onMatchRoute = pathname.startsWith("/match/");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4">
        <h1 className="text-lg font-bold tracking-tight text-gradient sm:text-xl">
          {t("appTitle")}
        </h1>
        <nav className="flex items-center gap-2">
          {onMatchRoute ? (
            <IconButton label={t("filters")} onClick={onOpenFilters}>
              <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
            </IconButton>
          ) : null}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-accent bg-accent px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>{t("newMatch")}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
