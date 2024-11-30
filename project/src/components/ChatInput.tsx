import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your symptoms..."
        className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />
      <Button type="submit" disabled={!input.trim()}>
        <Send className="w-4 h-4 mr-2" />
        Send
      </Button>
      <Button type="button" variant="secondary">
        <Mic className="w-4 h-4" />
      </Button>
    </form>
  );
};