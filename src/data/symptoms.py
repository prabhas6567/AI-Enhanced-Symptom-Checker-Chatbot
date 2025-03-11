from dataclasses import dataclass
from typing import List

@dataclass
class SymptomData:
    name: str
    keywords: List[str]
    related_symptoms: List[str]

symptoms_database = [
    SymptomData(
        name="headache",
        keywords=["headache", "migraine", "head pain"],
        related_symptoms=["nausea", "sensitivity to light"]
    ),
    SymptomData(
        name="fever",
        keywords=["fever", "high temperature", "pyrexia"],
        related_symptoms=["chills", "sweating"]
    ),
    # Add more symptoms as needed
]