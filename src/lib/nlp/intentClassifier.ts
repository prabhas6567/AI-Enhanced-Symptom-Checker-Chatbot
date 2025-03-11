export type Intent = 
  | 'describe_symptoms'
  | 'ask_recommendations'
  | 'emergency_help'
  | 'clarify_symptoms'
  | 'provide_history'
  | 'unknown';

export interface IntentClassification {
  intent: Intent;
  confidence: number;
  subIntents: string[];
}

export class IntentClassifier {
  private static readonly INTENT_PATTERNS = {
    describe_symptoms: [
      'feel', 'having', 'experiencing', 'suffering',
      'pain', 'ache', 'hurts', 'symptoms'
    ],
    ask_recommendations: [
      'what should', 'how can', 'help', 'advice',
      'recommend', 'suggestion', 'treatment'
    ],
    emergency_help: [
      'emergency', 'urgent', 'immediately', 'severe',
      'worst', 'unbearable', 'help'
    ],
    clarify_symptoms: [
      'mean', 'explain', 'clarify', 'specifically',
      'exactly', 'detail'
    ],
    provide_history: [
      'happened', 'started', 'began', 'history',
      'before', 'previous', 'past'
    ]
  };

  classifyIntent(text: string): IntentClassification {
    const normalizedText = text.toLowerCase();
    let maxConfidence = 0;
    let primaryIntent: Intent = 'unknown';
    const subIntents: string[] = [];

    // Calculate confidence for each intent
    for (const [intent, patterns] of Object.entries(IntentClassifier.INTENT_PATTERNS)) {
      const confidence = this.calculateIntentConfidence(normalizedText, patterns);
      
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        primaryIntent = intent as Intent;
      }
      
      if (confidence > 0.3) {
        subIntents.push(intent);
      }
    }

    return {
      intent: primaryIntent,
      confidence: maxConfidence,
      subIntents: subIntents
    };
  }

  private calculateIntentConfidence(text: string, patterns: string[]): number {
    let matches = 0;
    let totalWeight = 0;

    patterns.forEach(pattern => {
      const regex = new RegExp(`\\b${pattern}\\b`, 'i');
      if (regex.test(text)) {
        matches++;
        
        // Add weight based on pattern position
        const position = text.search(regex);
        const positionWeight = 1 - (position / text.length);
        totalWeight += positionWeight;
      }
    });

    return (matches / patterns.length) * 0.7 + (totalWeight / patterns.length) * 0.3;
  }
}