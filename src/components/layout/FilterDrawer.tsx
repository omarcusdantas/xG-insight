import { useEffect, useRef, useState } from "react";
import { IconButton } from "../ui/IconButton";
import { SegmentedControl } from "../ui/SegmentedControl";
import { X } from "lucide-react";
import { useMatchContext } from "../../hooks/useMatchContext";
import { useTranslation } from "react-i18next";

const THRESHOLDS = [0, 0.1, 0.15, 0.2] as const;

type FilterDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function FilterDrawer({ open, onClose }: FilterDrawerProps) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { xgThreshold, setXgThreshold } = useMatchContext();
  const [pending, setPending] = useState(xgThreshold);

  useEffect(() => {
    setPending(xgThreshold);
  }, [xgThreshold, open]);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (open && !node.open) {
      node.showModal();
    } else if (!open && node.open) {
      node.close();
    }
  }, [open]);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    const handleBackdrop = (e: MouseEvent) => {
      if (e.target === node) onClose();
    };
    node.addEventListener("cancel", handleCancel);
    node.addEventListener("click", handleBackdrop);
    return () => {
      node.removeEventListener("cancel", handleCancel);
      node.removeEventListener("click", handleBackdrop);
    };
  }, [onClose]);

  const options = THRESHOLDS.map((value) => ({
    value,
    label:
      value === 0
        ? t("threshold.all")
        : t(`threshold.${value.toFixed(2).replace(".", "_")}` as const),
  }));

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="filter-drawer-title"
      className="m-0 ml-auto h-full max-h-none w-full max-w-sm border-l border-border bg-surface p-0 text-text shadow-xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2
            id="filter-drawer-title"
            className="text-base font-semibold uppercase tracking-wide text-text-dim"
          >
            {t("filters")}
          </h2>
          <IconButton label={t("filters")} onClick={onClose}>
            <X className="h-5 w-5" aria-hidden="true" />
          </IconButton>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">
              {t("threshold.label")}
            </span>
            <SegmentedControl
              ariaLabel={t("threshold.label")}
              options={options}
              value={pending}
              onChange={setPending}
            />
          </div>
        </div>
        <div className="flex gap-3 border-t border-border p-5">
          <button
            type="button"
            className="flex-1 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-semibold text-text transition-colors hover:bg-surface-2"
            onClick={() => setPending(0)}
          >
            {t("actions.reset")}
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg border border-accent bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            onClick={() => {
              setXgThreshold(pending);
              onClose();
            }}
          >
            {t("actions.apply")}
          </button>
        </div>
      </div>
    </dialog>
  );
}
