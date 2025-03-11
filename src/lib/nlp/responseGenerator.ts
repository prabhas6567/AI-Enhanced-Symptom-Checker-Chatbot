import { Entity } from './entityRecognizer';
import { DialogueContext } from './contextManager';
import { IntentClassification } from './intentClassifier';

export class ResponseGenerator {
  generateResponse(
    entities: Entity[],
    intent: IntentClassification,
    context: DialogueContext
  ): string {
    if (this.isEmergencySituation(entities, intent)) {
      return this.generateEmergencyResponse(entities);
    }

    if (intent.intent === 'describe_symptoms') {
      return this.generateSymptomResponse(entities, context);
    }

    if (intent.intent === 'ask_recommendations') {
      return this.generateRecommendationResponse(entities, context);
    }

    if (intent.intent === 'clarify_symptoms') {
      return this.generateClarifyingResponse(entities, context);
    }

    return this.generateFallbackResponse(context);
  }

  private isEmergencySituation(
    entities: Entity[],
    intent: IntentClassification
  ): boolean {
    const severityEntities = entities.filter(e => e.type === 'severity');
    const hasSevereSymptoms = severityEntities.some(e => e.value === 'severe');
    const isEmergencyIntent = intent.intent === 'emergency_help';

    return hasSevereSymptoms || isEmergencyIntent;
  }

  private generateEmergencyResponse(entities: Entity[]): string {
    return `🚨 Based on what you've described, please seek immediate medical attention:

1. Call emergency services (911) immediately
2. Stay calm and seated if possible
3. Have someone stay with you if available
4. Keep your medical information ready

Would you like first-aid guidance while waiting for emergency services?`;
  }

  private generateSymptomResponse(
    entities: Entity[],
    context: DialogueContext
  ): string {
    const symptoms = entities.filter(e => e.type === 'symptom');
    
    if (symptoms.length === 0) {
      return this.generateClarifyingResponse(entities, context);
    }

    return `I understand you're experiencing ${this.formatSymptomList(symptoms)}. 
To help better assess your situation:

1. How long have you had these symptoms?
2. Did they start suddenly or gradually?
3. Have you had similar symptoms before?`;
  }

  private generateRecommendationResponse(
    entities: Entity[],
    context: DialogueContext
  ): string {
    const symptoms = entities.filter(e => e.type === 'symptom');
    const severity = entities.find(e => e.type === 'severity')?.value || 'mild';

    if (symptoms.length === 0) {
      return `To provide specific recommendations, could you please describe your symptoms first?`;
    }

    return `Based on your symptoms (${this.formatSymptomList(symptoms)}), here are my recommendations:

${this.getRecommendations(symptoms, severity)}

Would you like more specific information about any of these recommendations?`;
  }

  private generateClarifyingResponse(
    entities: Entity[],
    context: DialogueContext
  ): string {
    const questions = [
      "Could you describe your symptoms in more detail? For example, when did they start and where do you feel discomfort?",
      "To help you better, could you tell me more about what you're experiencing and when it started?",
      "I'd like to understand your symptoms better. Could you describe what you're feeling and how long it's been happening?"
    ];

    return questions[Math.floor(Math.random() * questions.length)];
  }

  private generateFallbackResponse(context: DialogueContext): string {
    return `I want to make sure I understand correctly. Could you please:

1. Describe your main symptoms
2. Mention when they started
3. Rate their severity from 1-10`;
  }

  private formatSymptomList(symptoms: Entity[]): string {
    return symptoms
      .map(s => s.value)
      .join(', ')
      .replace(/, ([^,]*)$/, ' and $1');
  }

  private getRecommendations(symptoms: Entity[], severity: string): string {
    // This would typically pull from a medical recommendations database
    // For now, returning a placeholder response
    return severity === 'severe' 
      ? `**Important:** Consider seeking medical attention soon.

• Rest and avoid strenuous activity
• Monitor your symptoms closely
• Have someone stay with you if possible
• Prepare to seek emergency care if symptoms worsen`
      : `Self-Care Tips:
• Rest and stay hydrated
• Monitor your symptoms
• Take over-the-counter medication as appropriate
• Avoid strenuous activity

When to Seek Medical Care:
• If symptoms persist over 24 hours
• If you develop new symptoms
• If your condition worsens`;
  }
}