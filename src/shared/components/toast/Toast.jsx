import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useRef,
} from "react";
import styles from "./Toast.module.css";
import {
  CheckIcon,
  CircleAlert,
  TriangleAlert,
} from "lucide-react";

/*
  Usage:

    import { useToast } from "<path to this file>";
    .
    .
    .
    
      const { addToast } = useToast();

      addToast(
        type:     string,     -> "error" | "success" | "info" | "warning"
        title:    string,
        message:  string,
        duration: number,     -> time in milli-seconds. eg: 2000 (2s) 
      );
*/

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const icons = {
  success: <CheckIcon     size={16} />,
  error:   <CircleAlert   size={16} />,
  warning: <TriangleAlert size={16} />,
  info:    <CircleAlert   size={16} />,
};

// ─── Single Toast Item ─────────────────────────────────────────────────────────

function ToastItem({ toast, onRemove }) {
  const [state, setState] = useState("entering");
  const duration = toast.duration ?? 4000;
  const timerRef = useRef(null);

  const startLeave = useCallback(() => {
    setState("leaving");
    setTimeout(() => onRemove(toast.id), 380);
  }, [toast.id, onRemove]);

  useEffect(() => {
    const enterTimer = setTimeout(() => setState("visible"), 10);

    timerRef.current = setTimeout(startLeave, duration);

    return () => {
      clearTimeout(enterTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, startLeave]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(startLeave, 1500);
  };

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]} ${styles[state]}`}
      role="alert"
      aria-live="assertive"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.icon}>{icons[toast.type]}</span>

      <div className={styles.body}>
        {toast.title && <p className={styles.title}>{toast.title}</p>}
        <p className={styles.message}>{toast.message}</p>
      </div>

      <button
        className={styles.close}
        onClick={startLeave}
        aria-label="Dismiss notification"
      >
        <svg
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2 2l10 10M12 2L2 12"
            strokeWidth="1.75"
            strokeLinecap="round"
            stroke="currentColor"
          />
        </svg>
      </button>

      <div
        className={styles.progress}
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
}

// ─── Toast Container ───────────────────────────────────────────────────────────

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className={styles.container} aria-label="Notifications">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}