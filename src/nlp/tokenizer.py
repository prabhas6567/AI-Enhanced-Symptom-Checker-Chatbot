from dataclasses import dataclass
from typing import List, Dict, Pattern
import re

@dataclass
class Token:
    """Represents a single token from the input text."""
    value: str
    type: str
    position: int

class Tokenizer:
    """Handles text tokenization into words, numbers, punctuation, and whitespace."""
    
    PATTERNS: Dict[str, Pattern] = {
        'word': re.compile(r'[a-zA-Z]+'),
        'number': re.compile(r'\d+'),
        'punctuation': re.compile(r'[.,!?;]'),
        'whitespace': re.compile(r'\s+')
    }

    def tokenize(self, text: str) -> List[Token]:
        """
        Tokenize input text into a list of Token objects.
        
        Args:
            text: Input text to tokenize
            
        Returns:
            List of Token objects
        """
        tokens: List[Token] = []
        current_position = 0

        while current_position < len(text):
            matched = False
            remaining_text = text[current_position:]

            for token_type, pattern in self.PATTERNS.items():
                match = pattern.match(remaining_text)
                if match and match.start() == 0:
                    tokens.append(Token(
                        value=match.group(),
                        type=token_type,
                        position=current_position
                    ))
                    current_position += match.end()
                    matched = True
                    break

            if not matched:
                current_position += 1

        return tokens
