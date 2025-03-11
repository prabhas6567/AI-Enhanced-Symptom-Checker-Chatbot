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
    id: 'cold-flu',
    name: 'Cold/Flu Symptoms',
    keywords: ['cold', 'flu', 'runny nose', 'sore throat', 'fever', 'coughing'],
    relatedSymptoms: ['headache', 'fatigue', 'body aches'],
    severity: {
      mild: 'Mild discomfort with minimal impact on daily activities',
      moderate: 'Noticeable symptoms affecting daily activities',
      severe: 'High fever, severe cough, or difficulty breathing'
    },
    recommendations: {
      selfCare: [
        'Rest and get plenty of sleep',
        'Stay hydrated with water and warm fluids',
        'Try herbal teas with honey',
        'Use throat lozenges for sore throat',
        'Take over-the-counter cold medications'
      ],
      whenToSeekHelp: [
        'Fever persists over 3 days',
        'Symptoms worsen after 7 days',
        'Difficulty breathing',
        'Severe chest pain'
      ],
      urgentCare: [
        'High fever above 103°F (39.4°C)',
        'Severe difficulty breathing',
        'Chest pain or pressure',
        'Severe weakness or dizziness'
      ]
    }
  },
  {
    id: 'headache',
    name: 'Headache',
    keywords: ['headache', 'migraine', 'head pain', 'tension headache'],
    relatedSymptoms: ['nausea', 'sensitivity to light', 'dizziness'],
    severity: {
      mild: 'Mild discomfort that doesn\'t interfere with activities',
      moderate: 'Noticeable pain affecting concentration',
      severe: 'Intense pain preventing normal activities'
    },
    recommendations: {
      selfCare: [
        'Rest in a quiet, dark room',
        'Apply cold or warm compress',
        'Stay hydrated',
        'Practice relaxation techniques',
        'Take over-the-counter pain relievers'
      ],
      whenToSeekHelp: [
        'Headaches become more frequent',
        'Pain is not relieved by medication',
        'Headache interferes with daily life'
      ],
      urgentCare: [
        'Sudden, severe headache',
        'Headache with confusion or difficulty speaking',
        'Headache with fever and stiff neck'
      ]
    }
  },
  {
    id: 'nausea',
    name: 'Nausea',
    keywords: ['nausea', 'vomiting', 'upset stomach', 'queasy'],
    relatedSymptoms: ['dizziness', 'headache', 'stomach pain'],
    severity: {
      mild: 'Occasional queasiness without vomiting',
      moderate: 'Frequent nausea with some vomiting',
      severe: 'Persistent vomiting, unable to keep fluids down'
    },
    recommendations: {
      selfCare: [
        'Sip clear fluids slowly',
        'Try ginger tea or peppermint tea',
        'Eat small, bland meals',
        'Avoid strong odors',
        'Rest in a seated position'
      ],
      whenToSeekHelp: [
        'Symptoms last more than 24 hours',
        'Unable to keep liquids down',
        'Signs of dehydration'
      ],
      urgentCare: [
        'Severe abdominal pain',
        'Blood in vomit',
        'Severe dehydration'
      ]
    }
  },
  {
    id: 'digestive-issues',
    name: 'Digestive Issues',
    keywords: ['bloating', 'gas', 'indigestion', 'stomach discomfort'],
    relatedSymptoms: ['nausea', 'abdominal pain', 'changes in appetite'],
    severity: {
      mild: 'Occasional discomfort that passes quickly',
      moderate: 'Regular discomfort affecting daily activities',
      severe: 'Intense pain or persistent symptoms'
    },
    recommendations: {
      selfCare: [
        'Drink peppermint or chamomile tea',
        'Apply warm compress to abdomen',
        'Take gentle walks after meals',
        'Avoid carbonated drinks',
        'Eat slowly and chew thoroughly'
      ],
      whenToSeekHelp: [
        'Symptoms persist for several days',
        'Significant changes in bowel habits',
        'Unexplained weight loss'
      ],
      urgentCare: [
        'Severe abdominal pain',
        'Blood in stool',
        'High fever with symptoms'
      ]
    }
  },
  {
    id: 'allergies',
    name: 'Seasonal Allergies',
    keywords: ['allergies', 'hay fever', 'sneezing', 'itchy eyes'],
    relatedSymptoms: ['runny nose', 'congestion', 'coughing'],
    severity: {
      mild: 'Occasional symptoms that don\'t interfere with activities',
      moderate: 'Regular symptoms affecting daily life',
      severe: 'Significant impact on breathing or daily activities'
    },
    recommendations: {
      selfCare: [
        'Stay indoors during high pollen counts',
        'Use air purifiers',
        'Try saline nasal rinses',
        'Take over-the-counter antihistamines',
        'Keep windows closed during high pollen times'
      ],
      whenToSeekHelp: [
        'Symptoms significantly impact quality of life',
        'Over-the-counter medications aren\'t helping',
        'Developing new allergy symptoms'
      ],
      urgentCare: [
        'Difficulty breathing',
        'Severe allergic reaction',
        'Swelling of face or throat'
      ]
    }
  },
  {
    id: 'muscle-strain',
    name: 'Muscle Strain',
    keywords: ['strain', 'pulled muscle', 'muscle pain', 'sprain'],
    relatedSymptoms: ['swelling', 'stiffness', 'limited mobility'],
    severity: {
      mild: 'Minor discomfort with full range of motion',
      moderate: 'Pain with some limitation of movement',
      severe: 'Significant pain and limited mobility'
    },
    recommendations: {
      selfCare: [
        'Apply RICE method (Rest, Ice, Compression, Elevation)',
        'Take over-the-counter pain relievers',
        'Gentle stretching when appropriate',
        'Avoid strenuous activity',
        'Use proper support when moving'
      ],
      whenToSeekHelp: [
        'Pain persists beyond a week',
        'Significant swelling',
        'Unable to bear weight or move normally'
      ],
      urgentCare: [
        'Severe pain with minimal movement',
        'Obvious deformity',
        'Complete loss of function'
      ]
    }
  },
  {
    id: 'skin-irritation',
    name: 'Skin Irritation',
    keywords: ['rash', 'itching', 'skin irritation', 'dermatitis'],
    relatedSymptoms: ['redness', 'swelling', 'dry skin'],
    severity: {
      mild: 'Minor irritation without significant discomfort',
      moderate: 'Noticeable discomfort affecting daily activities',
      severe: 'Intense irritation or spreading rash'
    },
    recommendations: {
      selfCare: [
        'Apply cool compress',
        'Use gentle, fragrance-free moisturizer',
        'Take an oatmeal bath',
        'Avoid scratching',
        'Wear loose, cotton clothing'
      ],
      whenToSeekHelp: [
        'Rash spreads or worsens',
        'Signs of infection',
        'Symptoms persist beyond a week'
      ],
      urgentCare: [
        'Severe allergic reaction',
        'Rash with fever',
        'Blistering or open sores'
      ]
    }
  },
  {
    id: 'anxiety',
    name: 'Anxiety',
    keywords: ['anxiety', 'stress', 'worry', 'panic'],
    relatedSymptoms: ['restlessness', 'difficulty concentrating', 'sleep problems'],
    severity: {
      mild: 'Occasional worry that passes quickly',
      moderate: 'Regular anxiety affecting daily activities',
      severe: 'Intense anxiety or panic attacks'
    },
    recommendations: {
      selfCare: [
        'Practice deep breathing exercises',
        'Try meditation or mindfulness',
        'Regular physical exercise',
        'Maintain a routine',
        'Get adequate sleep'
      ],
      whenToSeekHelp: [
        'Anxiety interferes with daily life',
        'Developing physical symptoms',
        'Unable to control worry'
      ],
      urgentCare: [
        'Thoughts of self-harm',
        'Severe panic attacks',
        'Unable to function normally'
      ]
    }
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    keywords: ['tired', 'exhausted', 'fatigue', 'low energy'],
    relatedSymptoms: ['weakness', 'difficulty concentrating', 'mood changes'],
    severity: {
      mild: 'Temporary tiredness that improves with rest',
      moderate: 'Regular fatigue affecting daily activities',
      severe: 'Extreme exhaustion preventing normal activities'
    },
    recommendations: {
      selfCare: [
        'Maintain a regular sleep schedule',
        'Eat a balanced diet',
        'Regular moderate exercise',
        'Reduce caffeine intake',
        'Take short rest breaks during the day'
      ],
      whenToSeekHelp: [
        'Fatigue persists despite adequate rest',
        'Accompanied by other symptoms',
        'Significant impact on daily life'
      ],
      urgentCare: [
        'Sudden, severe fatigue',
        'Inability to stay awake',
        'Accompanied by chest pain or difficulty breathing'
      ]
    }
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    keywords: ['insomnia', 'can\'t sleep', 'sleepless', 'trouble sleeping'],
    relatedSymptoms: ['fatigue', 'irritability', 'difficulty concentrating'],
    severity: {
      mild: 'Occasional difficulty sleeping',
      moderate: 'Regular sleep problems affecting daily life',
      severe: 'Chronic inability to sleep'
    },
    recommendations: {
      selfCare: [
        'Establish a regular bedtime routine',
        'Create a comfortable sleep environment',
        'Limit screen time before bed',
        'Try relaxation techniques',
        'Avoid caffeine in the evening'
      ],
      whenToSeekHelp: [
        'Sleep problems persist for weeks',
        'Affecting work or daily activities',
        'Developing other health issues'
      ],
      urgentCare: [
        'Complete inability to sleep for several days',
        'Severe mental health symptoms',
        'Physical symptoms of exhaustion'
      ]
    }
  }
];