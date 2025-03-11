import { SymptomData } from '../../data/symptoms';

export type ResponseType = 'question' | 'analysis' | 'recommendation';
export type ConversationStep = 'initial' | 'gathering' | 'analysis' | 'recommendation';

export interface ConversationContext {
  mentionedSymptoms: Set<string>;
  askedQuestions: Set<string>;
  confirmedSeverity: boolean;
  durationAsked: boolean;
  lastResponseType: ResponseType;
  symptomHistory: Array<{ symptom: string; timestamp: Date }>;
  currentStep: ConversationStep;
}

export interface SymptomAnalysisResult {
  symptoms: SymptomData[];
  severity: string;
  recommendations: string[];
}