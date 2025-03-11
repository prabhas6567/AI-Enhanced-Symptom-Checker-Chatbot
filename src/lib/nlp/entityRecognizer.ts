import { Token } from './tokenizer';
import { symptomsDatabase, SymptomData } from '../../data/symptoms';

export interface Entity {
  type: 'symptom' | 'severity' | 'duration' | 'bodyPart' | 'medication';
  value: string;
  confidence: number;
  startPosition: number;
  endPosition: number;
}

export class EntityRecognizer {
  private static readonly SEVERITY_INDICATORS = {
    mild: ['mild', 'slight', 'minor', 'little'],
    moderate: ['moderate', 'medium', 'uncomfortable'],
    severe: ['severe', 'intense', 'extreme', 'worst', 'unbearable']
  };

  private static readonly DURATION_PATTERNS = {
    specific: /(\d+)\s*(day|week|month|year)s?/i,
    relative: /(few|couple|several)\s*(day|week|month|year)s?/i,
    timeOfDay: /(morning|afternoon|evening|night)/i
  };

  private static readonly BODY_PARTS = [
    'head', 'chest', 'stomach', 'back', 'arm', 'leg', 'throat',
    'neck', 'shoulder', 'knee', 'ankle', 'wrist', 'elbow'
  ];

  recognizeEntities(tokens: Token[]): Entity[] {
    const entities: Entity[] = [];
    const text = tokens.map(t => t.value).join(' ');

    // Recognize symptoms
    entities.push(...this.recognizeSymptoms(text, tokens));

    // Recognize severity
    entities.push(...this.recognizeSeverity(text, tokens));

    // Recognize duration
    entities.push(...this.recognizeDuration(text));

    // Recognize body parts
    entities.push(...this.recognizeBodyParts(text, tokens));

    return entities;
  }

  private recognizeSymptoms(text: string, tokens: Token[]): Entity[] {
    const entities: Entity[] = [];
    
    symptomsDatabase.forEach(symptom => {
      symptom.keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        let match;
        
        while ((match = regex.exec(text)) !== null) {
          entities.push({
            type: 'symptom',
            value: symptom.name,
            confidence: this.calculateSymptomConfidence(text, symptom),
            startPosition: match.index,
            endPosition: match.index + match[0].length
          });
        }
      });
    });

    return entities;
  }

  private recognizeSeverity(text: string, tokens: Token[]): Entity[] {
    const entities: Entity[] = [];

    Object.entries(EntityRecognizer.SEVERITY_INDICATORS).forEach(([severity, indicators]) => {
      indicators.forEach(indicator => {
        const regex = new RegExp(`\\b${indicator}\\b`, 'gi');
        let match;

        while ((match = regex.exec(text)) !== null) {
          entities.push({
            type: 'severity',
            value: severity,
            confidence: 0.8,
            startPosition: match.index,
            endPosition: match.index + match[0].length
          });
        }
      });
    });

    return entities;
  }

  private recognizeDuration(text: string): Entity[] {
    const entities: Entity[] = [];

    Object.entries(EntityRecognizer.DURATION_PATTERNS).forEach(([type, pattern]) => {
      const matches = text.matchAll(pattern as RegExp);
      for (const match of matches) {
        if (match.index !== undefined) {
          entities.push({
            type: 'duration',
            value: match[0],
            confidence: 0.9,
            startPosition: match.index,
            endPosition: match.index + match[0].length
          });
        }
      }
    });

    return entities;
  }

  private recognizeBodyParts(text: string, tokens: Token[]): Entity[] {
    const entities: Entity[] = [];

    EntityRecognizer.BODY_PARTS.forEach(bodyPart => {
      const regex = new RegExp(`\\b${bodyPart}\\b`, 'gi');
      let match;

      while ((match = regex.exec(text)) !== null) {
        entities.push({
          type: 'bodyPart',
          value: bodyPart,
          confidence: 0.9,
          startPosition: match.index,
          endPosition: match.index + match[0].length
        });
      }
    });

    return entities;
  }

  private calculateSymptomConfidence(text: string, symptom: SymptomData): number {
    let confidence = 0;
    
    // Check for exact keyword matches
    const exactMatches = symptom.keywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    ).length;
    confidence += exactMatches * 0.3;

    // Check for related symptoms
    const relatedMatches = symptom.relatedSymptoms.filter(related =>
      text.toLowerCase().includes(related.toLowerCase())
    ).length;
    confidence += relatedMatches * 0.2;

    // Context-based confidence boost
    if (text.toLowerCase().includes('doctor') || 
        text.toLowerCase().includes('hospital')) {
      confidence += 0.1;
    }

    return Math.min(confidence, 1);
  }
}