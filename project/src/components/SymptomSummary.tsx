import React from 'react';
import { SymptomData } from '../data/symptoms';
import { AlertTriangle, ThermometerSun, Stethoscope } from 'lucide-react';

interface SymptomSummaryProps {
  symptoms: SymptomData[];
  severity: string;
  recommendations: string[];
}

export const SymptomSummary: React.FC<SymptomSummaryProps> = ({
  symptoms,
  severity,
  recommendations
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return 'text-red-600 bg-red-50';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-2">
        <ThermometerSun className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold">Detected Symptoms:</h3>
      </div>
      <div className="pl-7">
        {symptoms.map(symptom => (
          <div key={symptom.id} className="mb-2">
            <p className="font-medium">{symptom.name}</p>
            <p className="text-sm text-gray-600">{symptom.severity[severity as keyof typeof symptom.severity]}</p>
          </div>
        ))}
      </div>

      <div className={`flex items-center gap-2 p-2 rounded ${getSeverityColor(severity)}`}>
        <AlertTriangle className="w-5 h-5" />
        <span className="font-medium">Severity Level: {severity}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold">Recommendations:</h3>
        </div>
        <ul className="pl-7 list-disc space-y-1">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-sm text-gray-700">{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};