import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const alertClassByType = {
  success: "alert-success",
  error: "alert-error",
  warning: "alert-warning",
  info: "alert-info",
};

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  let seq = 0;

  const addNotification = (type, message) => {
    const id = `${Date.now()}-${seq++}`; // unique even within the same ms
    setNotifications((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 2000);
  };

  const api = {
    success: (msg) => addNotification("success", msg),
    error: (msg) => addNotification("error", msg),
    warning: (msg) => addNotification("warning", msg),
    info: (msg) => addNotification("info", msg),
  };

  return (
    <NotificationContext.Provider value={api}>
      {children}
      <div className="toast toast-top toast-end">
        {notifications?.map((n) => (
          <div
            key={n?.id}
            role="alert"
            className={`alert ${
              alertClassByType[n?.type] ?? "alert-info"
            } alert-soft`}
          >
            <span>{n?.message}</span>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
