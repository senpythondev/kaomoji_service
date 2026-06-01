"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Mascot } from "./Mascot";
import { CheckIcon } from "./icons";

/** Show a toast: bold `message`, with an optional smaller `subtitle` line. */
type ShowToast = (message?: string, subtitle?: string) => void;

const ToastContext = createContext<ShowToast>(() => {});

/** Trigger the global toast (copy confirmations, favorites, …). */
export function useToast(): ShowToast {
  return useContext(ToastContext);
}

interface ToastContent {
  message: string;
  subtitle?: string;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ToastContent | null>(null);
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback<ShowToast>((msg = "コピーしました", subtitle) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (clearTimer.current) clearTimeout(clearTimer.current);
    setContent({ message: msg, subtitle });
    setVisible(true);
    hideTimer.current = setTimeout(() => setVisible(false), 1700);
    clearTimer.current = setTimeout(() => setContent(null), 2050);
  }, []);

  useEffect(
    () => () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (clearTimer.current) clearTimeout(clearTimer.current);
    },
    [],
  );

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end"
      >
        {content && (
          <div
            role="status"
            className={`pointer-events-auto flex items-center gap-3 rounded-full bg-ink py-2.5 pl-2.5 pr-5 text-white shadow-card transition duration-200 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <span className="grid size-9 place-items-center rounded-full bg-white/15">
              <Mascot size={26} />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="flex items-center gap-1.5 text-sm font-bold">
                <CheckIcon size={15} className="text-[var(--cat-greeting)]" />
                {content.message}
              </span>
              {content.subtitle && (
                <span className="text-xs text-white/70">{content.subtitle}</span>
              )}
            </span>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
