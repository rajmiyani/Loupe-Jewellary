// Bridge toast notifications from non-React modules (like Redux thunks)
// to the React ToastProvider via a window CustomEvent.

export function toastNotify({ type = 'success', title = 'Success', description = '', duration = 2500 } = {}) {
  try {
    const event = new CustomEvent('app:toast', {
      detail: { type, title, description, duration },
    });
    window.dispatchEvent(event);
  } catch (e) {
    // window may not exist in some environments; ignore
  }
}


