import React, { useEffect } from 'react';

const icons = {
  success: 'âœ…',
  error: 'âš ï¸',
  info: 'â„¹ï¸',
};

const Toast = ({ id, type = 'success', title = 'Success', description = '', duration = 2500, onClose }) => {
  useEffect(() => {
    const t = setTimeout(() => onClose?.(id), duration);
    return () => clearTimeout(t);
  }, [id, duration, onClose]);

  return (
    <div role="status" aria-live="polite" className={`toast ${type}`}>
      <span aria-hidden>{icons[type] || icons.success}</span>
      <div>
        <div className="title">{title}</div>
        {description && <div className="desc text-sm">{description}</div>}
      </div>
      <button aria-label="Close" onClick={() => onClose?.(id)} className="ml-2 opacity-70 hover:opacity-100">âœ–</button>
    </div>
  );
};

export default Toast;









