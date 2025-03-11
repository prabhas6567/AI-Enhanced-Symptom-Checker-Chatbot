import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { Send, Mic, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setIsThinking(true);
      onSend(input.trim());
      setInput('');
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="flex gap-2"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 relative">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe your symptoms... (Press Enter to send)"
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none min-h-[44px] max-h-[120px] transition-all duration-200"
          rows={1}
        />
        {isThinking && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader className="w-4 h-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button 
          type="submit" 
          disabled={!input.trim() || isThinking}
          className="transition-all duration-200 hover:scale-105"
        >
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
        <Button 
          type="button" 
          variant="secondary"
          onClick={() => setIsRecording(!isRecording)}
          className={`transition-all duration-200 hover:scale-105 ${
            isRecording ? 'bg-red-100 text-red-600 hover:bg-red-200' : ''
          }`}
        >
          <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
        </Button>
      </div>
    </motion.form>
  );
};