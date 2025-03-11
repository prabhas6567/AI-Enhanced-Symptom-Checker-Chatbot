import React from 'react';
import { SymptomData } from '../data/symptoms';
import { AlertTriangle, ThermometerSun, Stethoscope, Clock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

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
        return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="rounded-lg border p-4 bg-white shadow-sm"
        variants={item}
      >
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Current Status</h3>
        </div>
        <div className={`flex items-center gap-2 p-2 rounded border ${getSeverityColor(severity)}`}>
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">Severity Level: {severity}</span>
        </div>
      </motion.div>

      <motion.div 
        className="rounded-lg border p-4 bg-white shadow-sm"
        variants={item}
      >
        <div className="flex items-center gap-2 mb-3">
          <ThermometerSun className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Detected Symptoms</h3>
        </div>
        <div className="space-y-2">
          {symptoms.map(symptom => (
            <motion.div 
              key={symptom.id}
              className="p-2 rounded bg-gray-50"
              variants={item}
            >
              <p className="font-medium text-gray-900">{symptom.name}</p>
              <p className="text-sm text-gray-600">
                {symptom.severity[severity as keyof typeof symptom.severity]}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="rounded-lg border p-4 bg-white shadow-sm"
        variants={item}
      >
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Timeline</h3>
        </div>
        <div className="text-sm text-gray-600">
          Tracking symptom progression and changes over time
        </div>
      </motion.div>

      <motion.div 
        className="rounded-lg border p-4 bg-white shadow-sm"
        variants={item}
      >
        <div className="flex items-center gap-2 mb-3">
          <Stethoscope className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Recommendations</h3>
        </div>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <motion.li 
              key={index}
              className="text-sm text-gray-700 flex items-start gap-2"
              variants={item}
            >
              <span className="text-blue-600 mt-1">•</span>
              <span>{rec}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};