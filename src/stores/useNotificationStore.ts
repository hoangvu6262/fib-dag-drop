import { create } from "zustand";
import { NotificationType } from "../constants/type";

type Notification = {
  id: string;
  message: string;
  type: NotificationType;
};

type NotificationState = {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (message, type, duration = 3000) => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id
          ),
        }));
      }, duration);
    }
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  },
}));
