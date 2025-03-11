import React from 'react';
import { Bot, User } from 'lucide-react';

interface MessageAvatarProps {
  isBot: boolean;
}

export const MessageAvatar: React.FC<MessageAvatarProps> = ({ isBot }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
    isBot ? 'bg-blue-100' : 'bg-green-100'
  }`}>
    {isBot ? (
      <Bot className="w-5 h-5 text-blue-600" />
    ) : (
      <User className="w-5 h-5 text-green-600" />
    )}
  </div>
);