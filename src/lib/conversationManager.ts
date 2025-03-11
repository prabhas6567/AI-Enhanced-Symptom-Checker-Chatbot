import { SymptomData } from '../data/symptoms';

interface ConversationContext {
  mentionedSymptoms: Set<string>;
  askedQuestions: Set<string>;
  confirmedSeverity: boolean;
  durationAsked: boolean;
  lastResponseType: 'question' | 'analysis' | 'recommendation';
  symptomHistory: Array<{ symptom: string; timestamp: Date }>;
  currentStep: 'initial' | 'gathering' | 'analysis' | 'recommendation';
}

export class ConversationManager {
  private context: ConversationContext = {
    mentionedSymptoms: new Set(),
    askedQuestions: new Set(),
    confirmedSeverity: false,
    durationAsked: false,
    lastResponseType: 'question',
    symptomHistory: [],
    currentStep: 'initial'
  };

  private greetings = [
    "Hello! I'm your health assistant. How are you feeling today? Please describe any symptoms you're experiencing.",
    "Hi! I'm here to help you understand your health concerns better. What symptoms would you like to discuss?",
    "Welcome! I'm your AI health assistant. Please tell me what's bothering you, and I'll help assess your symptoms."
  ];

  generateResponse(
    symptoms: SymptomData[],
    severity: string,
    userInput: string
  ): string {
    if (this.context.currentStep === 'initial') {
      this.context.currentStep = 'gathering';
      return this.greetings[Math.floor(Math.random() * this.greetings.length)];
    }

    if (this.isEmergencySituation(userInput, severity)) {
      return this.generateEmergencyResponse(symptoms);
    }

    if (symptoms.length === 0) {
      return this.generateClarifyingQuestion();
    }

    const response = this.buildResponse(symptoms, severity, userInput);
    this.updateContext(symptoms, userInput);
    
    return response;
  }

  private isEmergencySituation(input: string, severity: string): boolean {
    const emergencyKeywords = [
      'cant breathe', 'chest pain', 'unconscious',
      'severe pain', 'passing out', 'emergency'
    ];
    return severity === 'severe' || 
           emergencyKeywords.some(keyword => input.toLowerCase().includes(keyword));
  }

  private generateEmergencyResponse(symptoms: SymptomData[]): string {
    return `🚨 Based on what you've described, you should seek immediate medical attention. Please:

1. Call emergency services (911) immediately
2. Stay calm and seated if possible
3. Have someone stay with you if available
4. Keep any relevant medical information ready

Would you like first-aid guidance while waiting for emergency services?`;
  }

  private buildResponse(
    symptoms: SymptomData[],
    severity: string,
    userInput: string
  ): string {
    if (!this.context.durationAsked) {
      this.context.durationAsked = true;
      return `I understand you're experiencing these symptoms. To help better:

1. How long have you had these symptoms?
2. Did they start suddenly or gradually?
3. Have you had similar symptoms before?`;
    }

    if (!this.context.confirmedSeverity) {
      this.context.confirmedSeverity = true;
      return `Thank you. A few more questions:

1. On a scale of 1-10, how severe are your symptoms?
2. Does anything make them better or worse?
3. Are you taking any medications?`;
    }

    return this.generateDetailedResponse(symptoms, severity);
  }

  private generateDetailedResponse(
    symptoms: SymptomData[],
    severity: string
  ): string {
    const recommendations = this.generateRecommendations(symptoms, severity);
    
    return `Based on your description, here's my assessment:

${recommendations}

Would you like more specific information about any of these recommendations?`;
  }

  private generateRecommendations(symptoms: SymptomData[], severity: string): string {
    let recommendations = '';

    if (severity === 'severe') {
      recommendations = `**Important:** Consider seeking medical attention soon.

Recommendations:
${symptoms.flatMap(s => s.recommendations.whenToSeekHelp).map(r => `• ${r}`).join('\n')}`;
    } else {
      recommendations = `Self-Care Tips:
${symptoms.flatMap(s => s.recommendations.selfCare).map(r => `• ${r}`).join('\n')}

When to Seek Medical Care:
${symptoms.flatMap(s => s.recommendations.whenToSeekHelp).map(r => `• ${r}`).join('\n')}`;
    }

    return recommendations;
  }

  private generateClarifyingQuestion(): string {
    const questions = [
      "Could you describe your symptoms in more detail? For example, when did they start and where do you feel discomfort?",
      "To help you better, could you tell me more about what you're experiencing and when it started?",
      "I'd like to understand your symptoms better. Could you describe what you're feeling and how long it's been happening?"
    ];

    const question = questions[Math.floor(Math.random() * questions.length)];
    this.context.askedQuestions.add(question);
    return question;
  }

  private updateContext(symptoms: SymptomData[], userInput: string): void {
    symptoms.forEach(symptom => {
      if (!this.context.mentionedSymptoms.has(symptom.id)) {
        this.context.mentionedSymptoms.add(symptom.id);
        this.context.symptomHistory.push({
          symptom: symptom.id,
          timestamp: new Date()
        });
      }
    });
  }

  reset(): void {
    this.context = {
      mentionedSymptoms: new Set(),
      askedQuestions: new Set(),
      confirmedSeverity: false,
      durationAsked: false,
      lastResponseType: 'question',
      symptomHistory: [],
      currentStep: 'initial'
    };
  }
}