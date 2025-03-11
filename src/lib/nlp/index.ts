import { Tokenizer, type Token } from './tokenizer';
import { EntityRecognizer, type Entity } from './entityRecognizer';
import { IntentClassifier, type Intent, type IntentClassification } from './intentClassifier';
import { ContextManager, type DialogueContext } from './contextManager';
import { ResponseGenerator } from './responseGenerator';

export class NLPProcessor {
  private tokenizer: Tokenizer;
  private entityRecognizer: EntityRecognizer;
  private intentClassifier: IntentClassifier;
  private contextManager: ContextManager;
  private responseGenerator: ResponseGenerator;

  constructor() {
    this.tokenizer = new Tokenizer();
    this.entityRecognizer = new EntityRecognizer();
    this.intentClassifier = new IntentClassifier();
    this.contextManager = new ContextManager();
    this.responseGenerator = new ResponseGenerator();
  }

  processInput(text: string): string {
    // Tokenize input
    const tokens = this.tokenizer.tokenize(text);

    // Recognize entities
    const entities = this.entityRecognizer.recognizeEntities(tokens);

    // Classify intent
    const intent = this.intentClassifier.classifyIntent(text);

    // Update context
    this.contextManager.updateContext(entities, intent);

    // Generate response
    return this.responseGenerator.generateResponse(
      entities,
      intent,
      this.contextManager.getContext()
    );
  }

  reset(): void {
    this.contextManager.reset();
  }
}

export type {
  Token,
  Entity,
  Intent,
  IntentClassification,
  DialogueContext
};