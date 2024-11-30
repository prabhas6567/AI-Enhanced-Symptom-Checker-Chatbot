import { create } from 'zustand';
import { Message } from '../types/chat';
import { analyzeSymptoms } from '../lib/symptomAnalyzer';
import { SymptomData } from '../data/symptoms';
import { ConversationManager } from '../lib/conversationManager';

interface ChatState {
  messages: Message[];
  currentSymptoms: SymptomData[];
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  conversationManager: ConversationManager;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  analyzeUserInput: (input: string) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  currentSymptoms: [],
  severity: 'mild',
  recommendations: [],
  conversationManager: new ConversationManager(),
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        },
      ],
    })),
  analyzeUserInput: (input) => {
    const analysis = analyzeSymptoms(input);
    const state = get();
    
    const botResponse = state.conversationManager.generateResponse(
      analysis.detectedSymptoms,
      analysis.severity,
      input
    );

    set({
      currentSymptoms: analysis.detectedSymptoms,
      severity: analysis.severity,
      recommendations: analysis.recommendations
    });

    setTimeout(() => {
      state.addMessage({ type: 'bot', content: botResponse });
    }, 1000);
  },
  clearMessages: () => {
    const state = get();
    state.conversationManager.reset();
    set({ 
      messages: [], 
      currentSymptoms: [], 
      recommendations: [] 
    });
  },
}));