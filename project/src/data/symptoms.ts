export interface SymptomData {
  id: string;
  name: string;
  keywords: string[];
  relatedSymptoms: string[];
  severity: {
    mild: string;
    moderate: string;
    severe: string;
  };
  recommendations: {
    selfCare: string[];
    whenToSeekHelp: string[];
    urgentCare: string[];
  };
}

export const symptomsDatabase: SymptomData[] = [
  {
    id: 'headache',
    name: 'Headache',
    keywords: ['head pain', 'migraine', 'head pressure', 'head hurts', 'headache'],
    relatedSymptoms: ['nausea', 'sensitivity to light', 'dizziness'],
    severity: {
      mild: 'Mild discomfort that doesn\'t interfere with daily activities',
      moderate: 'Noticeable pain that affects concentration',
      severe: 'Intense pain that prevents normal activities'
    },
    recommendations: {
      selfCare: [
        'Rest in a quiet, dark room',
        'Stay hydrated',
        'Apply cold or warm compress',
        'Take over-the-counter pain relievers'
      ],
      whenToSeekHelp: [
        'Headache persists for more than 3 days',
        'Pain is accompanied by fever',
        'Regular activities become difficult'
      ],
      urgentCare: [
        'Sudden, severe headache',
        'Headache with confusion or difficulty speaking',
        'Headache after head injury'
      ]
    }
  },
  {
    id: 'fever',
    name: 'Fever',
    keywords: ['high temperature', 'feeling hot', 'chills', 'sweating', 'fever'],
    relatedSymptoms: ['body aches', 'fatigue', 'headache'],
    severity: {
      mild: 'Temperature between 37.8°C and 38.3°C',
      moderate: 'Temperature between 38.4°C and 39.4°C',
      severe: 'Temperature above 39.5°C'
    },
    recommendations: {
      selfCare: [
        'Rest and stay hydrated',
        'Take acetaminophen or ibuprofen',
        'Use light clothing and bedding',
        'Take lukewarm baths'
      ],
      whenToSeekHelp: [
        'Fever lasts more than 3 days',
        'Develops rash or other symptoms',
        'Have underlying health conditions'
      ],
      urgentCare: [
        'Temperature above 40°C',
        'Severe headache with stiff neck',
        'Difficulty breathing'
      ]
    }
  },
  {
    id: 'cough',
    name: 'Cough',
    keywords: ['coughing', 'chest congestion', 'dry cough', 'wet cough', 'cough'],
    relatedSymptoms: ['sore throat', 'runny nose', 'fever'],
    severity: {
      mild: 'Occasional cough with minimal disruption',
      moderate: 'Frequent cough affecting sleep or activities',
      severe: 'Persistent cough with difficulty breathing'
    },
    recommendations: {
      selfCare: [
        'Stay hydrated',
        'Use honey for soothing',
        'Try over-the-counter cough medicine',
        'Use a humidifier'
      ],
      whenToSeekHelp: [
        'Cough persists over 2 weeks',
        'Produces thick, colored mucus',
        'Accompanied by fever'
      ],
      urgentCare: [
        'Difficulty breathing',
        'Coughing up blood',
        'Severe chest pain when coughing'
      ]
    }
  },
  {
    id: 'nausea',
    name: 'Nausea',
    keywords: ['feeling sick', 'queasy', 'vomiting', 'nauseous', 'nausea'],
    relatedSymptoms: ['dizziness', 'headache', 'stomach pain'],
    severity: {
      mild: 'Slight queasiness without vomiting',
      moderate: 'Persistent nausea with occasional vomiting',
      severe: 'Severe vomiting unable to keep fluids down'
    },
    recommendations: {
      selfCare: [
        'Sip clear fluids slowly',
        'Eat bland foods',
        'Avoid strong odors',
        'Try ginger tea'
      ],
      whenToSeekHelp: [
        'Symptoms last more than 24 hours',
        'Unable to keep liquids down',
        'Signs of dehydration'
      ],
      urgentCare: [
        'Severe abdominal pain',
        'Blood in vomit',
        'Signs of severe dehydration'
      ]
    }
  }
];