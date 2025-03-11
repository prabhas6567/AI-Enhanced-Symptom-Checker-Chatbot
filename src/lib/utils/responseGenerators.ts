import { SymptomData } from '../../data/symptoms';

export const generateSelfCareRecommendations = (symptoms: SymptomData[]): string => {
  const recommendations = symptoms.flatMap(s => s.recommendations.selfCare);
  return [...new Set(recommendations)]
    .map(rec => `• ${rec}`)
    .join('\n');
};

export const generateWarningSignsInfo = (symptoms: SymptomData[]): string => {
  const warnings = symptoms.flatMap(s => s.recommendations.whenToSeekHelp);
  return [...new Set(warnings)]
    .map(warning => `• ${warning}`)
    .join('\n');
};

export const getEmergencyKeywords = (): string[] => [
  'cant breathe', 'chest pain', 'unconscious',
  'severe pain', 'passing out', 'emergency', 'heart attack',
  'stroke', 'seizure', 'bleeding heavily'
];

export const getGreetings = (): string[] => [
  "Hello! I'm your health assistant. I'm here to help you understand your symptoms better. How can I help you today?",
  "Hi there! I'm here to assist you with any health concerns. What symptoms are you experiencing?",
  "Welcome! I'm your AI health assistant. Please tell me what's bothering you, and I'll do my best to help."
];

export const getClarifyingQuestions = (): string[] => [
  "Could you describe your main symptoms in more detail? For example, when did they start and where exactly do you feel discomfort?",
  `To help you better, could you tell me:
1. What symptoms are bothering you most?
2. When did they begin?
3. Have you noticed any patterns?`,
  `I'd like to understand your symptoms better. Could you please:
1. Describe the main issue you're experiencing
2. Mention if you have any other symptoms
3. Tell me if anything makes it better or worse`
];