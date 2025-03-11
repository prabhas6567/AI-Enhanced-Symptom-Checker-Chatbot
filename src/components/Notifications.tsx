import React from 'react';
import { X, Bell } from 'lucide-react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

interface NotificationsProps {
  onClose: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      title: 'Symptom Check Reminder',
      message: 'Remember to log any new or changing symptoms for better analysis.',
      time: '2 hours ago',
      type: 'reminder'
    },
    {
      id: 2,
      title: 'New Feature Available',
      message: 'Try our enhanced symptom analysis with severity tracking.',
      time: '1 day ago',
      type: 'update'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium">{notification.title}</h3>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </motion.div>
          ))}
        </div>

        <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-600">
            View all
          </Button>
        </div>
      </motion.div>
    </div>
  );
}