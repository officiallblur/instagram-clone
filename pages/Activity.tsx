import React from 'react';
import { NOTIFICATIONS_DATA } from '../constants';
import type { Notification } from '../types';

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const renderText = () => {
    switch(notification.type) {
      case 'follow':
        return <>started following you. <span className="text-gray-400">{notification.timestamp}</span></>;
      case 'like':
        return <>liked your post. <span className="text-gray-400">{notification.timestamp}</span></>;
      case 'comment':
        return <>commented: {notification.commentText} <span className="text-gray-400">{notification.timestamp}</span></>;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center space-x-3 py-2">
      <img src={notification.user.avatarUrl} alt={notification.user.username} className="h-11 w-11 rounded-full object-cover"/>
      <p className="flex-1 text-sm">
        <span className="font-bold">{notification.user.username}</span> {renderText()}
      </p>
      {notification.type === 'follow' ? (
        <button className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-lg">Follow</button>
      ) : (
        <img src={notification.postPreviewUrl} alt="post preview" className="h-11 w-11 object-cover" />
      )}
    </div>
  );
};

const Activity: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <header className="p-4 sticky top-0 bg-black z-10">
        <h1 className="text-2xl font-bold">Activity</h1>
      </header>
      <div className="px-4">
        {Object.entries(NOTIFICATIONS_DATA).map(([period, notifications]) => (
          <div key={period}>
            <h2 className="font-bold text-md my-3">{period}</h2>
            {notifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;