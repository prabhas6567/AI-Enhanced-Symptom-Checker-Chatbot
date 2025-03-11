import { create } from 'zustand';
import { Message } from '../types/chat';
import { analyzeSymptoms } from '../lib/symptomAnalyzer';
import { SymptomData } from '../data/symptoms';

interface UserInfo {
  name: string;
  age: number;
  gender: string;
  medicalHistory?: string;
  currentMedications?: string;
  allergies?: string;
}

interface ChatState {
  messages: Message[];
  currentSymptoms: SymptomData[];
  severity: string;
  recommendations: string[];
  isAnalyzing: boolean;
  userInfo: UserInfo | null;
  onboardingStep: 'initial' | 'name' | 'age' | 'gender' | 'medical-history' | 'medications' | 'allergies' | 'symptoms' | 'complete';
  hasGreeted: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  analyzeUserInput: (input: string) => void;
  clearMessages: () => void;
  setUserInfo: (info: Partial<UserInfo>) => void;
  setOnboardingStep: (step: ChatState['onboardingStep']) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  currentSymptoms: [],
  severity: '',
  recommendations: [],
  isAnalyzing: false,
  userInfo: null,
  onboardingStep: 'initial',
  hasGreeted: false,

  setUserInfo: (info) =>
    set((state) => ({
      userInfo: { ...state.userInfo as UserInfo, ...info }
    })),

  setOnboardingStep: (step) =>
    set({ onboardingStep: step }),

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

  analyzeUserInput: async (input) => {
    set({ isAnalyzing: true });
    const state = get();
    
    // Add user message
    const userMessage = {
      type: 'user' as const,
      content: input,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
    }));

    // Initial greeting
    if (state.onboardingStep === 'initial' && !state.hasGreeted) {
      set((state) => ({
        hasGreeted: true,
        onboardingStep: 'name',
        messages: [
          ...state.messages,
          {
            type: 'bot',
            content: "Welcome to Health Assistant Pro. I'm here to help you with your health concerns. To provide you with the best possible care, I'll need to ask you a few questions. First, could you please tell me your name?",
            id: crypto.randomUUID(),
            timestamp: new Date(),
          },
        ],
      }));
      set({ isAnalyzing: false });
      return;
    }

    // Handle onboarding flow
    switch (state.onboardingStep) {
      case 'name':
        set((state) => ({
          userInfo: { name: input, age: 0, gender: '' },
          onboardingStep: 'age',
          messages: [
            ...state.messages,
            {
              type: 'bot',
              content: `Thank you, ${input}. For accurate medical guidance, could you please tell me your age?`,
              id: crypto.randomUUID(),
              timestamp: new Date(),
            },
          ],
        }));
        break;

      case 'age':
        const age = parseInt(input);
        if (isNaN(age)) {
          set((state) => ({
            messages: [
              ...state.messages,
              {
                type: 'bot',
                content: 'Please enter a valid age in numbers.',
                id: crypto.randomUUID(),
                timestamp: new Date(),
              },
            ],
          }));
        } else {
          set((state) => ({
            userInfo: { ...state.userInfo!, age },
            onboardingStep: 'gender',
            messages: [
              ...state.messages,
              {
                type: 'bot',
                content: 'Thank you. To provide gender-specific health guidance, what is your gender? (Male/Female/Other)',
                id: crypto.randomUUID(),
                timestamp: new Date(),
              },
            ],
          }));
        }
        break;

      case 'gender':
        set((state) => ({
          userInfo: { ...state.userInfo!, gender: input },
          onboardingStep: 'medical-history',
          messages: [
            ...state.messages,
            {
              type: 'bot',
              content: 'Do you have any significant medical conditions or previous surgeries that I should be aware of? If none, please type "none".',
              id: crypto.randomUUID(),
              timestamp: new Date(),
            },
          ],
        }));
        break;

      case 'medical-history':
        set((state) => ({
          userInfo: { ...state.userInfo!, medicalHistory: input },
          onboardingStep: 'medications',
          messages: [
            ...state.messages,
            {
              type: 'bot',
              content: 'Are you currently taking any medications? If none, please type "none".',
              id: crypto.randomUUID(),
              timestamp: new Date(),
            },
          ],
        }));
        break;

      case 'medications':
        set((state) => ({
          userInfo: { ...state.userInfo!, currentMedications: input },
          onboardingStep: 'allergies',
          messages: [
            ...state.messages,
            {
              type: 'bot',
              content: 'Do you have any allergies to medications or other substances? If none, please type "none".',
              id: crypto.randomUUID(),
              timestamp: new Date(),
            },
          ],
        }));
        break;

      case 'allergies':
        set((state) => ({
          userInfo: { ...state.userInfo!, allergies: input },
          onboardingStep: 'symptoms',
          messages: [
            ...state.messages,
            {
              type: 'bot',
              content: `Thank you for providing that information, ${state.userInfo!.name}. Now, please describe the symptoms you're experiencing. Include:
1. What symptoms are you experiencing?
2. When did they start?
3. How severe are they on a scale of 1-10?`,
              id: crypto.randomUUID(),
              timestamp: new Date(),
            },
          ],
        }));
        break;

      case 'symptoms':
        const analysis = analyzeSymptoms(input);
        const userInfo = get().userInfo!;
        
        let response = `Thank you for describing your symptoms, ${userInfo.name}. Based on your description, I understand you're experiencing ${analysis.detectedSymptoms.map(s => s.name.toLowerCase()).join(', ')}.\n\n`;
        
        // Include relevant medical history in analysis
        if (userInfo.medicalHistory && userInfo.medicalHistory !== 'none') {
          response += `Given your medical history, `;
        } else {
          response += `Based on your description and age (${userInfo.age}), `;
        }
        
        response += `this appears to be ${analysis.severity} in severity.\n\n`;
        
        if (analysis.severity === 'severe') {
          response += `⚠️ Given the severity of your symptoms${userInfo.medicalHistory !== 'none' ? ' and your medical history' : ''}, I strongly recommend seeking immediate medical attention.\n\n`;
        }

        response += `Recommendations:\n${analysis.recommendations.join('\n')}\n\n`;
        
        // Add medication-specific warnings if applicable
        if (userInfo.currentMedications && userInfo.currentMedications !== 'none') {
          response += `Note: Please consult with your healthcare provider about potential interactions with your current medications.\n\n`;
        }

        response += `Would you like more specific information about any of these symptoms or recommendations?`;

        set((state) => ({
          messages: [
            ...state.messages,
            {
              type: 'bot',
              content: response,
              id: crypto.randomUUID(),
              timestamp: new Date(),
            },
          ],
          currentSymptoms: analysis.detectedSymptoms,
          severity: analysis.severity,
          recommendations: analysis.recommendations,
        }));
        break;
    }

    set({ isAnalyzing: false });
  },

  clearMessages: () => {
    set({ 
      messages: [],
      currentSymptoms: [],
      severity: '',
      recommendations: [],
      isAnalyzing: false,
      userInfo: null,
      onboardingStep: 'initial',
      hasGreeted: false,
    });
  },
}));