import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Toast {
  message: string;
  icon?: JSX.Element;
}

interface ToastContextType {
  toast: Toast | null;
  setToast: (toast: Toast | null) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500); // Auto-hide after 3.5 seconds
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-white border border-blue-200 shadow-lg rounded-lg px-5 py-3 flex items-center gap-3 animate-fadeIn">
          {toast.icon}
          <span className="text-blue-900 font-medium">{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};