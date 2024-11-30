import { SymptomData } from '../data/symptoms';

interface ConversationContext {
  mentionedSymptoms: Set<string>;
  askedQuestions: Set<string>;
  confirmedSeverity: boolean;
  durationAsked: boolean;
  lastResponseType: 'question' | 'analysis' | 'recommendation';
  symptomHistory: Array<{ symptom: string; timestamp: Date }>;
}

export class ConversationManager {
  private context: ConversationContext = {
    mentionedSymptoms: new Set(),
    askedQuestions: new Set(),
    confirmedSeverity: false,
    durationAsked: false,
    lastResponseType: 'question',
    symptomHistory: [],
  };

  generateResponse(
    symptoms: SymptomData[],
    severity: string,
    userInput: string
  ): string {
    // Handle emergency situations immediately
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
    const symptomList = symptoms
      .map(s => s.name.toLowerCase())
      .join(' and ');
    
    return `URGENT: Based on your description of ${symptomList}, you should seek immediate medical attention. Please call emergency services or go to the nearest emergency room. Do not wait to see if symptoms improve.`;
  }

  private buildResponse(
    symptoms: SymptomData[],
    severity: string,
    userInput: string
  ): string {
    const symptomsText = symptoms
      .map(s => s.name.toLowerCase())
      .join(' and ');

    if (!this.context.durationAsked) {
      this.context.durationAsked = true;
      this.context.lastResponseType = 'question';
      return `I see you're experiencing ${symptomsText}. How long have you been experiencing these symptoms?`;
    }

    if (!this.context.confirmedSeverity) {
      this.context.confirmedSeverity = true;
      this.context.lastResponseType = 'question';
      return `I understand you have ${symptomsText}. On a scale from 1-10, how would you rate the intensity of your symptoms?`;
    }

    this.context.lastResponseType = 'analysis';
    return this.generateDetailedResponse(symptoms, severity, userInput);
  }

  private generateDetailedResponse(
    symptoms: SymptomData[],
    severity: string,
    userInput: string
  ): string {
    const symptomsText = symptoms
      .map(s => s.name.toLowerCase())
      .join(' and ');
    
    const severityText = severity === 'severe' ? 'serious' : 
                        severity === 'moderate' ? 'moderate' :
                        'mild';

    let response = `Based on your description, you're experiencing ${symptomsText} `;
    response += `which appears to be ${severityText}. `;

    if (severity === 'severe') {
      response += 'Given the severity, you should seek medical attention. ';
    } else {
      response += 'Here are some recommendations to help manage your symptoms: ';
    }

    return response;
  }

  private generateClarifyingQuestion(): string {
    const questions = [
      "Could you describe your symptoms in more detail?",
      "Where exactly are you experiencing discomfort?",
      "When did these symptoms first appear?",
      "Have you noticed any other symptoms alongside these?",
      "Does anything make the symptoms better or worse?",
      "Can you rate your discomfort on a scale of 1-10?",
      "Have you taken any medications for these symptoms?",
      "Do you have any pre-existing medical conditions?"
    ];

    let question: string;
    do {
      question = questions[Math.floor(Math.random() * questions.length)];
    } while (this.context.askedQuestions.has(question));

    this.context.askedQuestions.add(question);
    this.context.lastResponseType = 'question';
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
    };
  }
}