import React from 'react';
import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';

  return (
    <div
      className={`flex items-start gap-3 ${
        isBot ? 'bg-gray-50' : 'bg-white'
      } p-4 rounded-lg`}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
        {isBot ? (
          <Bot className="w-5 h-5 text-blue-600" />
        ) : (
          <User className="w-5 h-5 text-blue-600" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{message.content}</p>
        <span className="text-xs text-gray-500 mt-1">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};