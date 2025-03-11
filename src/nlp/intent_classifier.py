from dataclasses import dataclass
from typing import List, Dict, Literal
import re

IntentType = Literal[
    'describe_symptoms',
    'ask_recommendations',
    'emergency_help',
    'clarify_symptoms',
    'provide_history',
    'unknown'
]

@dataclass
class IntentClassification:
    """Classification result for user intent."""
    intent: IntentType
    confidence: float
    sub_intents: List[str]

class IntentClassifier:
    """Classifies user intent based on input text."""

    INTENT_PATTERNS: Dict[str, List[str]] = {
        'describe_symptoms': [
            'feel', 'having', 'experiencing', 'suffering',
            'pain', 'ache', 'hurts', 'symptoms'
        ],
        'ask_recommendations': [
            'what should', 'how can', 'help', 'advice',
            'recommend', 'suggestion', 'treatment'
        ],
        'emergency_help': [
            'emergency', 'urgent', 'immediately', 'severe',
            'worst', 'unbearable', 'help'
        ],
        'clarify_symptoms': [
            'mean', 'explain', 'clarify', 'specifically',
            'exactly', 'detail'
        ],
        'provide_history': [
            'happened', 'started', 'began', 'history',
            'before', 'previous', 'past'
        ]
    }

    def classify_intent(self, text: str) -> IntentClassification:
        """
        Classify the intent of user input text.
        
        Args:
            text: User input text
            
        Returns:
            IntentClassification object with intent and confidence
        """
        normalized_text = text.lower()
        max_confidence = 0.0
        primary_intent: IntentType = 'unknown'
        sub_intents: List[str] = []

        for intent, patterns in self.INTENT_PATTERNS.items():
            confidence = self._calculate_intent_confidence(normalized_text, patterns)
            
            if confidence > max_confidence:
                max_confidence = confidence
                primary_intent = intent  # type: ignore

            if confidence > 0.3:
                sub_intents.append(intent)

        return IntentClassification(
            intent=primary_intent,
            confidence=max_confidence,
            sub_intents=sub_intents
        )

    def _calculate_intent_confidence(self, text: str, patterns: List[str]) -> float:
        matches = 0
        total_weight = 0.0

        for pattern in patterns:
            regex = re.compile(rf'\b{pattern}\b', re.I)
            if match := regex.search(text):
                matches += 1
                
                # Weight based on position
                position = match.start()
                position_weight = 1 - (position / len(text))
                total_weight += position_weight

        pattern_count = len(patterns)
        return (matches / pattern_count) * 0.7 + (total_weight / pattern_count) * 0.3
