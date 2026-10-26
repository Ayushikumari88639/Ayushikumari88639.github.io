import { useEffect, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';

/**
 * Accessible modal on top of the native <dialog> element: focus is trapped by
 * the browser, Escape closes it, focus returns to the opener, and the page
 * behind is inert.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement;
      dialog.showModal();
      document.documentElement.classList.add('has-modal');
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    document.documentElement.classList.remove('has-modal');
    onClose();
    (opener.current as HTMLElement | null)?.focus?.();
  };

  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? 'modal--wide' : ''}`}
      aria-labelledby="modal-title"
      onClose={handleClose}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself) closes it.
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <div className="modal__inner">
        <header className="modal__head">
          <h2 id="modal-title">{title}</h2>
          <button className="icon-btn" onClick={() => ref.current?.close()} aria-label="Close dialog">
            <Icon name="close" size={20} />
          </button>
        </header>
        <div className="modal__body">{open && children}</div>
      </div>
    </dialog>
  );
}
