import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Toast from './Toast';

const ToastContext = createContext({ notify: () => {} });

export const useToast = () => useContext(ToastContext);

let idSeq = 1;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((options) => {
    const id = idSeq++;
    const toast = { id, type: 'success', title: 'Success', description: '', duration: 2500, ...options };
    setToasts((prev) => [...prev, toast]);
    return id;
  }, []);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div>
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook the window event to allow toasts from non-React modules
export const ToastEventBridge = () => {
  const { notify } = useToast();
  useEffect(() => {
    const handler = (e) => notify(e.detail || {});
    window.addEventListener('app:toast', handler);
    return () => window.removeEventListener('app:toast', handler);
  }, [notify]);
  return null;
};


