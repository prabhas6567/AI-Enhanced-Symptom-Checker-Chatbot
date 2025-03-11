import React from 'react';
import { Heart, Shield, Clock } from 'lucide-react';

export const WelcomeIntroduction: React.FC = () => {
  return (
    <div className="text-center space-y-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Welcome to Your Personal Health Assistant
      </h1>
      
      <p className="text-gray-600 max-w-2xl mx-auto">
        I'm here to help you understand your symptoms and provide initial guidance. 
        Please note that I'm an AI assistant and don't replace professional medical advice.
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
        <div className="p-4 rounded-lg bg-blue-50">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Caring Support</h3>
          <p className="text-sm text-gray-600">
            Compassionate and understanding assistance for your health concerns
          </p>
        </div>

        <div className="p-4 rounded-lg bg-blue-50">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Private & Secure</h3>
          <p className="text-sm text-gray-600">
            Your health information is kept confidential and secure
          </p>
        </div>

        <div className="p-4 rounded-lg bg-blue-50">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">24/7 Available</h3>
          <p className="text-sm text-gray-600">
            Get help anytime, day or night, whenever you need it
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 max-w-2xl mx-auto mt-8">
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> In case of emergency or severe symptoms, please contact emergency services 
          immediately or visit your nearest emergency room.
        </p>
      </div>
    </div>
  );
};