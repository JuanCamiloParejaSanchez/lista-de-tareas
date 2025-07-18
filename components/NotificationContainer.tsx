'use client';

import { useNotification } from '../hooks/useNotification';
import Notification from './Notification';

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{ 
            animationDelay: `${index * 100}ms`,
            zIndex: 1000 - index 
          }}
        >
          <Notification
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
          />
        </div>
      ))}
    </div>
  );
} 