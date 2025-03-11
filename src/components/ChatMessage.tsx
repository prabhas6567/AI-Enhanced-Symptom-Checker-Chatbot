import React from 'react';
import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${
        isBot ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-800'
      } p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-100 dark:bg-blue-800' : 'bg-green-100 dark:bg-green-800'
      }`}>
        {isBot ? (
          <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        ) : (
          <User className="w-5 h-5 text-green-600 dark:text-green-400" />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <ReactMarkdown 
          className="prose prose-sm max-w-none text-gray-900 dark:text-gray-100"
          components={{
            p: ({ children }) => <p className="text-sm leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-4 space-y-1">{children}</ul>,
            li: ({ children }) => <li className="text-sm text-gray-700 dark:text-gray-300">{children}</li>,
          }}
        >
          {message.content}
        </ReactMarkdown>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </motion.div>
  );
};