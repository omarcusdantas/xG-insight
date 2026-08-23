import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IconButton } from "./IconButton";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  titleId?: string;
}

export function Modal({ open, onClose, title, children, titleId }: ModalProps) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const generatedId = useRef(`modal-title-${Math.random().toString(36).slice(2, 9)}`);
  const labelId = titleId ?? generatedId.current;

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    else if (!open && node.open) node.close();
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

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelId}
      className="m-auto w-full max-w-md rounded-(--radius-card) border border-border bg-surface p-0 text-text shadow-(--shadow-card) backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 id={labelId} className="text-base font-semibold uppercase tracking-wide text-text-dim">
          {title}
        </h2>
        <IconButton label={t("actions.close")} onClick={onClose}>
          <X className="h-5 w-5" aria-hidden="true" />
        </IconButton>
      </div>
      <div className="flex max-h-[70vh] flex-col">{children}</div>
    </dialog>
  );
}
