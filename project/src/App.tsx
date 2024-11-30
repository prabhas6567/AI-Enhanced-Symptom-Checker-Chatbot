import React from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { SymptomSummary } from './components/SymptomSummary';
import { WelcomeIntroduction } from './components/WelcomeIntroduction';
import { useChatStore } from './store/useChatStore';
import { Bot, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './components/ui/Button';

function App() {
  const { 
    messages, 
    addMessage, 
    analyzeUserInput, 
    currentSymptoms, 
    severity, 
    recommendations,
    clearMessages 
  } = useChatStore();

  const handleSendMessage = (content: string) => {
    addMessage({ type: 'user', content });
    analyzeUserInput(content);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-3 gap-4">
        {/* Main Chat Interface */}
        <div className="col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">Health Assistant</h1>
                <p className="text-sm text-blue-100">AI-Powered Symptom Checker</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearMessages}
              className="text-white hover:bg-blue-500"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <WelcomeIntroduction />
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>

        {/* Symptom Analysis Panel */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Symptom Analysis</h2>
          </div>
          
          {currentSymptoms.length > 0 ? (
            <SymptomSummary
              symptoms={currentSymptoms}
              severity={severity}
              recommendations={recommendations}
            />
          ) : (
            <p className="text-gray-500 text-sm">
              Describe your symptoms in the chat, and I'll provide a detailed analysis and recommendations.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;