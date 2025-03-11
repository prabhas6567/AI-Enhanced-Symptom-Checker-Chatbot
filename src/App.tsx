import React from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { SymptomSummary } from './components/SymptomSummary';
import { WelcomeIntroduction } from './components/WelcomeIntroduction';
import { useChatStore } from './store/useChatStore';
import { Bot, AlertCircle, RefreshCw, Info, Settings as SettingsIcon, Bell, Sun, Moon } from 'lucide-react';
import { Button } from './components/ui/Button';
import { AnimatedContainer } from './components/ui/AnimatedContainer';
import { Settings } from './components/Settings';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from './lib/theme';

function App() {
  const [showSettings, setShowSettings] = React.useState(false);
  const { t } = useTranslation();
  const { theme, setTheme } = useThemeStore();
  
  const { 
    messages, 
    addMessage, 
    analyzeUserInput, 
    currentSymptoms, 
    severity, 
    recommendations,
    clearMessages,
    onboardingStep 
  } = useChatStore();

  React.useEffect(() => {
    // Set initial theme class
    document.documentElement.className = theme;
  }, [theme]);

  React.useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        type: 'bot',
        content: 'Hello! I\'m your health assistant. To help you better, could you please tell me your name?'
      });
    }
  }, []);

  const handleSendMessage = (content: string) => {
    analyzeUserInput(content);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.className = theme === 'dark' ? 'light' : 'dark';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="w-full max-w-6xl grid grid-cols-4 gap-4">
        {/* Main Chat Interface */}
        <div className="col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">{t('app.title')}</h1>
                <p className="text-sm text-blue-100">{t('app.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleTheme}
                className="text-white hover:bg-blue-500"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSettings(true)}
                className="text-white hover:bg-blue-500"
              >
                <SettingsIcon className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearMessages}
                className="text-white hover:bg-blue-500"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('app.newChat')}
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto p-4 space-y-4 dark:bg-gray-800">
            {messages.length === 0 ? (
              <WelcomeIntroduction />
            ) : (
              <AnimatedContainer>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </AnimatedContainer>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>

        {/* Symptom Analysis Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold dark:text-white">{t('app.analysis.title')}</h2>
            </div>
            
            {currentSymptoms && currentSymptoms.length > 0 ? (
              <SymptomSummary
                symptoms={currentSymptoms}
                severity={severity}
                recommendations={recommendations}
              />
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center mx-auto">
                  <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {t('app.analysis.placeholder')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">{t('app.quickActions.title')}</h3>
            <div className="space-y-2">
              <Button 
                variant="secondary" 
                className="w-full justify-start text-left dark:bg-gray-700 dark:text-white"
                onClick={() => handleSendMessage("What should I do if my symptoms get worse?")}
              >
                🚨 {t('app.quickActions.emergency')}
              </Button>
              <Button 
                variant="secondary"
                className="w-full justify-start text-left dark:bg-gray-700 dark:text-white"
                onClick={() => handleSendMessage("Can you explain how the symptom analysis works?")}
              >
                ℹ️ {t('app.quickActions.howItWorks')}
              </Button>
              <Button 
                variant="secondary"
                className="w-full justify-start text-left dark:bg-gray-700 dark:text-white"
                onClick={() => handleSendMessage("What are common symptoms of flu?")}
              >
                🤒 {t('app.quickActions.symptoms')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}

export default App;