import { SymptomData, symptomsDatabase } from '../data/symptoms';

interface SymptomAnalysis {
  detectedSymptoms: SymptomData[];
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  confidence: number;
}

export function analyzeSymptoms(userInput: string): SymptomAnalysis {
  const lowercaseInput = userInput.toLowerCase();
  const words = lowercaseInput.split(/\s+/);
  
  // Detect symptoms with confidence scoring
  const detectedSymptoms = symptomsDatabase.filter(symptom => {
    const keywordMatches = symptom.keywords.filter(keyword => 
      words.some(word => word.includes(keyword) || keyword.includes(word))
    );
    return keywordMatches.length > 0;
  });

  // Calculate confidence based on keyword matches and related symptoms
  const confidence = calculateConfidence(detectedSymptoms, lowercaseInput);
  
  // Determine severity based on keywords, combinations, and context
  const severity = determineSeverity(lowercaseInput, detectedSymptoms);
  
  // Get relevant recommendations
  const recommendations = getRecommendations(detectedSymptoms, severity);

  return {
    detectedSymptoms,
    severity,
    recommendations,
    confidence
  };
}

function calculateConfidence(symptoms: SymptomData[], input: string): number {
  if (symptoms.length === 0) return 0;

  let totalScore = 0;
  symptoms.forEach(symptom => {
    // Direct keyword matches
    const keywordMatches = symptom.keywords.filter(keyword => 
      input.includes(keyword)
    ).length;
    
    // Related symptom matches
    const relatedMatches = symptom.relatedSymptoms.filter(related =>
      input.includes(related)
    ).length;

    totalScore += (keywordMatches * 0.7) + (relatedMatches * 0.3);
  });

  return Math.min(totalScore / symptoms.length, 1);
}

function determineSeverity(
  input: string,
  symptoms: SymptomData[]
): 'mild' | 'moderate' | 'severe' {
  const severityKeywords = {
    severe: ['severe', 'intense', 'extreme', 'worst', 'unbearable', 'very bad'],
    moderate: ['moderate', 'medium', 'uncomfortable', 'bad'],
    mild: ['mild', 'slight', 'minor', 'little']
  };

  // Check for emergency keywords
  const emergencyKeywords = [
    'cant breathe', 'difficulty breathing', 'chest pain',
    'passing out', 'unconscious', 'severe pain'
  ];
  
  if (emergencyKeywords.some(keyword => input.includes(keyword))) {
    return 'severe';
  }

  // Check severity keywords
  if (severityKeywords.severe.some(keyword => input.includes(keyword))) {
    return 'severe';
  }
  if (severityKeywords.moderate.some(keyword => input.includes(keyword))) {
    return 'moderate';
  }

  // Check symptom combinations
  const hasMultipleSymptoms = symptoms.length > 1;
  const hasFever = symptoms.some(s => s.id === 'fever');
  
  if (hasMultipleSymptoms && hasFever) {
    return 'moderate';
  }

  return 'mild';
}

function getRecommendations(symptoms: SymptomData[], severity: string): string[] {
  const recommendations: string[] = [];
  
  symptoms.forEach(symptom => {
    if (severity === 'severe') {
      recommendations.push(...symptom.recommendations.urgentCare);
    } else if (severity === 'moderate') {
      recommendations.push(...symptom.recommendations.whenToSeekHelp);
    } else {
      recommendations.push(...symptom.recommendations.selfCare);
    }
  });

  // Add general recommendations based on severity
  if (severity === 'severe') {
    recommendations.push(
      '🚨 Please seek immediate medical attention',
      'Have someone stay with you if possible',
      'Keep your medical information ready'
    );
  } else if (severity === 'moderate') {
    recommendations.push(
      'Monitor your symptoms closely',
      'Consider consulting a healthcare provider if symptoms worsen',
      'Keep a symptom diary to track changes'
    );
  }

  // Remove duplicates and return
  return [...new Set(recommendations)];
}