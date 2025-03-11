from dataclasses import dataclass, field
from typing import List, Set
import time
from .entity_recognizer import Entity
from .intent_classifier import IntentClassification

@dataclass
class DialogueContext:
    """Maintains the context of the ongoing dialogue."""
    current_topic: str = ''
    entities: List[Entity] = field(default_factory=list)
    recent_intents: List[IntentClassification] = field(default_factory=list)
    turn_count: int = 0
    confirmed_entities: List[Entity] = field(default_factory=list)
    pending_questions: List[str] = field(default_factory=list)

class ContextManager:
    """Manages dialogue context and state."""

    CONTEXT_TIMEOUT = 300  # 5 minutes in seconds

    def __init__(self):
        self.context = self._create_initial_context()

    def _create_initial_context(self) -> DialogueContext:
        """Create a fresh dialogue context."""
        return DialogueContext()

    def update_context(self, entities: List[Entity], intent: IntentClassification) -> None:
        """
        Update context with new entities and intent.
        
        Args:
            entities: List of recognized entities
            intent: Classified intent
        """
        self.context.entities.extend(entities)
        self.context.recent_intents.insert(0, intent)
        self.context.recent_intents = self.context.recent_intents[:5]  # Keep last 5
        self.context.turn_count += 1

        self._cleanup_old_context()

    def add_pending_question(self, question: str) -> None:
        """Add a question to be asked later."""
        self.context.pending_questions.append(question)

    def confirm_entity(self, entity: Entity) -> None:
        """Mark an entity as confirmed."""
        self.context.confirmed_entities.append(entity)
        self.context.entities = [
            e for e in self.context.entities 
            if e.start_position != entity.start_position
        ]

    def get_context(self) -> DialogueContext:
        """Get current dialogue context."""
        return self.context

    def _cleanup_old_context(self) -> None:
        """Remove expired context elements."""
        current_time = time.time()
        self.context.entities = [
            entity for entity in self.context.entities 
            if (current_time - entity.start_position) < self.CONTEXT_TIMEOUT
        ]

    def reset(self) -> None:
        """Reset context to initial state."""
        self.context = self._create_initial_context()
