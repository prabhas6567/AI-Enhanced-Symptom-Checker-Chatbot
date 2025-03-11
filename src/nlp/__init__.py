from .tokenizer import Tokenizer, Token
from .entity_recognizer import EntityRecognizer, Entity
from .intent_classifier import IntentClassifier, IntentClassification
from .context_manager import ContextManager, DialogueContext
from .response_generator import ResponseGenerator

class NLPProcessor:
    """Main NLP processing class that coordinates all NLP components."""

    def __init__(self):
        self.tokenizer = Tokenizer()
        self.entity_recognizer = EntityRecognizer()
        self.intent_classifier = IntentClassifier()
        self.context_manager = ContextManager()
        self.response_generator = ResponseGenerator()

    def process_input(self, text: str) -> str:
        """
        Process user input text through the NLP pipeline.
        
        Args:
            text: User input text
            
        Returns:
            Generated response string
        """
        # Tokenize input
        tokens = self.tokenizer.tokenize(text)

        # Recognize entities
        entities = self.entity_recognizer.recognize_entities(tokens)

        # Classify intent
        intent = self.intent_classifier.classify_intent(text)

        # Update context
        self.context_manager.update_context(entities, intent)

        # Generate response
        return self.response_generator.generate_response(
            entities,
            intent,
            self.context_manager.get_context()
        )

    def reset(self) -> None:
        """Reset the NLP processor state."""
        self.context_manager.reset()

__all__ = [
    'NLPProcessor',
    'Token',
    'Entity',
    'IntentClassification',
    'DialogueContext'
]
