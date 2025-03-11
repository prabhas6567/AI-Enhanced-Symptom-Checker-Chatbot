from typing import List
from .entity_recognizer import Entity
from .context_manager import DialogueContext
from .intent_classifier import IntentClassification
import random

class ResponseGenerator:
    """Generates appropriate responses based on entities, intent, and context."""

    def generate_response(
        self,
        entities: List[Entity],
        intent: IntentClassification,
        context: DialogueContext
    ) -> str:
        """
        Generate appropriate response based on recognized entities and intent.
        
        Args:
            entities: List of recognized entities
            intent: Classified intent
            context: Current dialogue context
            
        Returns:
            Generated response string
        """
        if self._is_emergency_situation(entities, intent):
            return self._generate_emergency_response(entities)

        if intent.intent == 'describe_symptoms':
            return self._generate_symptom_response(entities, context)

        if intent.intent == 'ask_recommendations':
            return self._generate_recommendation_response(entities, context)

        if intent.intent == 'clarify_symptoms':
            return self._generate_clarifying_response(entities, context)

        return self._generate_fallback_response(context)

    def _is_emergency_situation(
        self,
        entities: List[Entity],
        intent: IntentClassification
    ) -> bool:
        severity_entities = [e for e in entities if e.type == 'severity']
        has_severe_symptoms = any(e.value == 'severe' for e in severity_entities)
        is_emergency_intent = intent.intent == 'emergency_help'

        return has_severe_symptoms or is_emergency_intent

    def _generate_emergency_response(self, entities: List[Entity]) -> str:
        return """🚨 Based on what you've described, please seek immediate medical attention:

1. Call emergency services (911) immediately
2. Stay calm and seated if possible
3. Have someone stay with you if available
4. Keep your medical information ready

Would you like first-aid guidance while waiting for emergency services?"""

    def _generate_symptom_response(
        self,
        entities: List[Entity],
        context: DialogueContext
    ) -> str:
        symptoms = [e for e in entities if e.type == 'symptom']
        
        if not symptoms:
            return self._generate_clarifying_response(entities, context)

        return f"""I understand you're experiencing {self._format_symptom_list(symptoms)}. 
To help better assess your situation:

1. How long have you had these symptoms?
2. Did they start suddenly or gradually?
3. Have you had similar symptoms before?"""

    def _generate_recommendation_response(
        self,
        entities: List[Entity],
        context: DialogueContext
    ) -> str:
        symptoms = [e for e in entities if e.type == 'symptom']
        severity = next((e.value for e in entities if e.type == 'severity'), 'mild')

        if not symptoms:
            return "To provide specific recommendations, could you please describe your symptoms first?"

        return f"""Based on your symptoms ({self._format_symptom_list(symptoms)}), here are my recommendations:

{self._get_recommendations(symptoms, severity)}

Would you like more specific information about any of these recommendations?"""

    def _generate_clarifying_response(
        self,
        entities: List[Entity],
        context: DialogueContext
    ) -> str:
        questions = [
            "Could you describe your symptoms in more detail? For example, when did they start and where do you feel discomfort?",
            "To help you better, could you tell me more about what you're experiencing and when it started?",
            "I'd like to understand your symptoms better. Could you describe what you're feeling and how long it's been happening?"
        ]

        return random.choice(questions)

    def _generate_fallback_response(self, context: DialogueContext) -> str:
        return """I want to make sure I understand correctly. Could you please:

1. Describe your main symptoms
2. Mention when they started
3. Rate their severity from 1-10"""

    def _format_symptom_list(self, symptoms: List[Entity]) -> str:
        """Format list of symptoms into readable string."""
        values = [s.value for s in symptoms]
        if len(values) > 1:
            return f"{', '.join(values[:-1])} and {values[-1]}"
        return values[0] if values else ""

    def _get_recommendations(self, symptoms: List[Entity], severity: str) -> str:
        if severity == 'severe':
            return """**Important:** Consider seeking medical attention soon.

• Rest and avoid strenuous activity
• Monitor your symptoms closely
• Have someone stay with you if possible
• Prepare to seek emergency care if symptoms worsen"""
        
        return """Self-Care Tips:
• Rest and stay hydrated
• Monitor your symptoms
• Take over-the-counter medication as appropriate
• Avoid strenuous activity

When to Seek Medical Care:
• If symptoms persist over 24 hours
• If you develop new symptoms
• If your condition worsens"""
