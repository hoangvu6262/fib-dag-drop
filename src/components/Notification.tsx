import React from "react";
import { useNotificationStore } from "../stores/useNotificationStore";
import "../assets/styles/notifications.scss";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="notifications-container">
      {notifications.map((notification) => (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          key={notification.id}
          className={clsx("notification", notification.type)}
        >
          <p>{notification.message}</p>
          <button
            className="notification__button"
            onClick={() => removeNotification(notification.id)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default Notifications;
