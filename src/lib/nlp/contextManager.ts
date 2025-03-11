import { Entity } from './entityRecognizer';
import { IntentClassification } from './intentClassifier';

export interface DialogueContext {
  currentTopic: string;
  entities: Entity[];
  recentIntents: IntentClassification[];
  turnCount: number;
  confirmedEntities: Entity[];
  pendingQuestions: string[];
}

export class ContextManager {
  private context: DialogueContext;
  private static readonly CONTEXT_TIMEOUT = 300000; // 5 minutes

  constructor() {
    this.context = this.createInitialContext();
  }

  private createInitialContext(): DialogueContext {
    return {
      currentTopic: '',
      entities: [],
      recentIntents: [],
      turnCount: 0,
      confirmedEntities: [],
      pendingQuestions: []
    };
  }

  updateContext(entities: Entity[], intent: IntentClassification): void {
    this.context.entities = [...this.context.entities, ...entities];
    this.context.recentIntents = [
      intent,
      ...this.context.recentIntents.slice(0, 4)
    ];
    this.context.turnCount++;

    this.cleanupOldContext();
  }

  addPendingQuestion(question: string): void {
    this.context.pendingQuestions.push(question);
  }

  confirmEntity(entity: Entity): void {
    this.context.confirmedEntities.push(entity);
    this.context.entities = this.context.entities.filter(
      e => e.startPosition !== entity.startPosition
    );
  }

  getContext(): DialogueContext {
    return { ...this.context };
  }

  private cleanupOldContext(): void {
    const now = Date.now();
    this.context.entities = this.context.entities.filter(entity => 
      (now - entity.startPosition) < ContextManager.CONTEXT_TIMEOUT
    );
  }

  reset(): void {
    this.context = this.createInitialContext();
  }
}