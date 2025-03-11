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

We welcome contributions to the AI-Enhanced Symptom Checker Chatbot project! To contribute, please follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top right corner of the repository page to create a copy of the repository in your GitHub account.

2. **Clone your fork**: Clone your forked repository to your local machine using the following command:
    ```bash
    git clone https://github.com/prabhas6567/AI-Enhanced-Symptom-Checker-Chatbot.git
    ```

3. **Create a feature branch**: Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make your changes**: Implement your feature or bug fix in your local repository.

5. **Commit your changes**: Commit your changes with a descriptive commit message:
    ```bash
    git add .
    git commit -m "Add feature: your-feature-name"
    ```

6. **Push to your branch**: Push your changes to your forked repository:
    ```bash
    git push origin feature/your-feature-name
    ```

7. **Create a Pull Request**: Go to the original repository and click the "New Pull Request" button. Select your feature branch and submit the pull request for review.

### Guidelines

- **Code Style**: Follow the existing code style and conventions used in the project.
- **Testing**: Ensure that your changes are well-tested and do not break existing functionality.
- **Documentation**: Update the documentation to reflect your changes, if necessary.
- **Commit Messages**: Write clear and concise commit messages that describe the changes made.


### Owner

This project is maintained by [Gampala Prabhas](https://github.com/prabhas6567). For any questions or support,

please contact [prabhas.gampala13@gmail.com](mailto:prabhas.gampala13@gmail.com).

You can connect with me On [LinkedIn](https://www.linkedin.com/in/gampala-prabhas-b2001722a/)

Thank you for your contributions! We appreciate your help in improving the AI-Enhanced Symptom Checker Chatbot.



## Disclaimer

This application is for informational purposes only and does not replace professional medical advice. Always consult with healthcare professionals for medical decisions.
