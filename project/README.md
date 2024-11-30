# AI-Enhanced Symptom Checker

A modern, AI-powered symptom checker built with React, TypeScript, and Tailwind CSS that helps users understand their symptoms and provides initial medical guidance.

## Features

- 🤖 AI-powered symptom analysis
- 💬 Natural conversation interface
- 📊 Real-time symptom severity assessment
- 🏥 Smart medical recommendations
- 🔒 Privacy-focused design
- 🌐 24/7 availability
- 🎯 Emergency situation detection
- 📱 Responsive design

## Technical Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom components with class-variance-authority

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── ChatInput.tsx   # Message input component
│   ├── ChatMessage.tsx # Individual message display
│   └── SymptomSummary  # Symptom analysis display
├── data/               # Static data and configurations
│   └── symptoms.ts     # Symptom database
├── lib/                # Utility functions and core logic
│   ├── symptomAnalyzer.ts    # Symptom analysis engine
│   ├── conversationManager.ts # Conversation flow control
│   └── utils.ts              # Helper functions
├── store/              # State management
│   └── useChatStore.ts # Global state with Zustand
└── types/              # TypeScript type definitions
    └── chat.ts         # Chat-related type definitions
```

## Core Components

### 1. Symptom Analyzer (`lib/symptomAnalyzer.ts`)
- Analyzes user input for symptoms
- Determines severity levels
- Generates appropriate recommendations
- Uses confidence scoring for accuracy

### 2. Conversation Manager (`lib/conversationManager.ts`)
- Manages conversation flow
- Handles emergency situations
- Generates contextual responses
- Maintains conversation history

### 3. Chat Store (`store/useChatStore.ts`)
- Manages global application state
- Handles message history
- Coordinates between components
- Manages symptom analysis state

## Key Features Implementation

### Symptom Detection
```typescript
function analyzeSymptoms(userInput: string): SymptomAnalysis {
  // Analyzes user input for symptoms
  // Returns detected symptoms, severity, and recommendations
}
```

### Severity Assessment
```typescript
function determineSeverity(
  input: string,
  symptoms: SymptomData[]
): 'mild' | 'moderate' | 'severe' {
  // Determines symptom severity based on:
  // - Keywords in user input
  // - Combination of symptoms
  // - Emergency indicators
}
```

### Conversation Flow
```typescript
class ConversationManager {
  generateResponse(
    symptoms: SymptomData[],
    severity: string,
    userInput: string
  ): string {
    // Generates appropriate responses based on:
    // - Current symptoms
    // - Conversation context
    // - Emergency situations
  }
}
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Usage Guidelines

### Basic Interaction
1. Enter symptoms in the chat input
2. The AI analyzes the input and asks relevant follow-up questions
3. View real-time symptom analysis in the side panel
4. Receive personalized recommendations

### Emergency Situations
- The system automatically detects emergency keywords
- Provides immediate guidance for urgent situations
- Recommends emergency services when necessary

## Security and Privacy

- No personal health information is stored
- All conversations are session-based
- No external API calls for symptom analysis
- Compliant with basic health data privacy practices

## Best Practices

1. **User Input**
   - Be specific about symptoms
   - Provide duration and severity
   - Mention any relevant medical history

2. **Emergency Situations**
   - Always follow emergency recommendations
   - Don't delay seeking medical help
   - Use emergency services when advised

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for any purpose.

## Disclaimer

This application is for informational purposes only and does not replace professional medical advice. Always consult with healthcare professionals for medical decisions.