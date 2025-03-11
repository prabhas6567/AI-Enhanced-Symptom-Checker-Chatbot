// Common types used across NLP modules
export interface BaseEntity {
  type: string;
  value: string;
  confidence: number;
  startPosition: number;
  endPosition: number;
}

export interface AnalysisResult {
  entities: BaseEntity[];
  intent: string;
  confidence: number;
  context?: Record<string, unknown>;
}