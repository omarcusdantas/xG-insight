import { type SubmitEvent, useState } from "react";
import { Button } from "../components/ui/Button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export function SearchPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!/^\d+$/.test(trimmed)) {
      setError(t("search.invalid"));
      return;
    }
    setError(null);
    navigate(`/match/${encodeURIComponent(trimmed)}`);
  }

  return (
    <main className="mx-auto w-full max-w-200 flex flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-text">{t("search.title")}</h2>
        <p className="text-sm text-text-dim">{t("search.subtitle")}</p>
      </div>
      <form
        onSubmit={submit}
        className="flex flex-col gap-3 rounded-(--radius-card) border border-border bg-surface p-5 shadow-(--shadow-card)"
        noValidate
      >
        <label className="flex flex-col gap-2">
          <span className="sr-only">{t("search.placeholder")}</span>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-dim"
            />
            <input
              type="search"
              inputMode="numeric"
              autoComplete="off"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              placeholder={t("search.placeholder")}
              className="w-full rounded-lg border border-border bg-surface-2 py-3 pl-10 pr-3 text-base text-text outline-none transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "search-error" : undefined}
            />
          </div>
        </label>
        {error ? (
          <p id="search-error" role="alert" className="text-sm text-red">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="primary">
          {t("search.cta")}
        </Button>
      </form>
    </main>
  );
}
