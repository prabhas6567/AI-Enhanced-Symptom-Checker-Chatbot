from dataclasses import dataclass
from typing import List, Dict, Pattern, Optional
import re
from .tokenizer import Token
from .data.symptoms import SymptomData, symptoms_database

@dataclass
class Entity:
    """Represents a recognized entity from the text."""
    type: str  # 'symptom' | 'severity' | 'duration' | 'bodyPart' | 'medication'
    value: str
    confidence: float
    start_position: int
    end_position: int

class EntityRecognizer:
    """Recognizes various medical entities from tokenized text."""

    SEVERITY_INDICATORS: Dict[str, List[str]] = {
        'mild': ['mild', 'slight', 'minor', 'little'],
        'moderate': ['moderate', 'medium', 'uncomfortable'],
        'severe': ['severe', 'intense', 'extreme', 'worst', 'unbearable']
    }

    DURATION_PATTERNS: Dict[str, Pattern] = {
        'specific': re.compile(r'(\d+)\s*(day|week|month|year)s?', re.I),
        'relative': re.compile(r'(few|couple|several)\s*(day|week|month|year)s?', re.I),
        'timeOfDay': re.compile(r'(morning|afternoon|evening|night)', re.I)
    }

    BODY_PARTS: List[str] = [
        'head', 'chest', 'stomach', 'back', 'arm', 'leg', 'throat',
        'neck', 'shoulder', 'knee', 'ankle', 'wrist', 'elbow'
    ]

    def recognize_entities(self, tokens: List[Token]) -> List[Entity]:
        """
        Recognize entities from tokenized text.
        
        Args:
            tokens: List of Token objects
            
        Returns:
            List of recognized Entity objects
        """
        text = ' '.join(t.value for t in tokens)
        entities: List[Entity] = []

        entities.extend(self._recognize_symptoms(text))
        entities.extend(self._recognize_severity(text))
        entities.extend(self._recognize_duration(text))
        entities.extend(self._recognize_body_parts(text))

        return entities

    def _recognize_symptoms(self, text: str) -> List[Entity]:
        entities: List[Entity] = []
        
        for symptom in symptoms_database:
            for keyword in symptom.keywords:
                for match in re.finditer(rf'\b{keyword}\b', text, re.I):
                    entities.append(Entity(
                        type='symptom',
                        value=symptom.name,
                        confidence=self._calculate_symptom_confidence(text, symptom),
                        start_position=match.start(),
                        end_position=match.end()
                    ))

        return entities

    def _recognize_severity(self, text: str) -> List[Entity]:
        entities: List[Entity] = []

        for severity, indicators in self.SEVERITY_INDICATORS.items():
            for indicator in indicators:
                for match in re.finditer(rf'\b{indicator}\b', text, re.I):
                    entities.append(Entity(
                        type='severity',
                        value=severity,
                        confidence=0.8,
                        start_position=match.start(),
                        end_position=match.end()
                    ))

        return entities

    def _recognize_duration(self, text: str) -> List[Entity]:
        entities: List[Entity] = []

        for pattern_type, pattern in self.DURATION_PATTERNS.items():
            for match in pattern.finditer(text):
                entities.append(Entity(
                    type='duration',
                    value=match.group(),
                    confidence=0.9,
                    start_position=match.start(),
                    end_position=match.end()
                ))

        return entities

    def _recognize_body_parts(self, text: str) -> List[Entity]:
        entities: List[Entity] = []

        for body_part in self.BODY_PARTS:
            for match in re.finditer(rf'\b{body_part}\b', text, re.I):
                entities.append(Entity(
                    type='bodyPart',
                    value=body_part,
                    confidence=0.9,
                    start_position=match.start(),
                    end_position=match.end()
                ))

        return entities

    def _calculate_symptom_confidence(self, text: str, symptom: SymptomData) -> float:
        confidence = 0.0
        text_lower = text.lower()
        
        # Exact keyword matches
        exact_matches = sum(1 for keyword in symptom.keywords 
                          if keyword.lower() in text_lower)
        confidence += exact_matches * 0.3

        # Related symptom matches
        related_matches = sum(1 for related in symptom.related_symptoms 
                            if related.lower() in text_lower)
        confidence += related_matches * 0.2

        # Context boost
        if 'doctor' in text_lower or 'hospital' in text_lower:
            confidence += 0.1

        return min(confidence, 1.0)