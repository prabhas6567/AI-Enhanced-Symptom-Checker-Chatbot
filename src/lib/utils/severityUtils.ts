export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'severe':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'moderate':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    default:
      return 'text-green-600 bg-green-50 border-green-200';
  }
};

export const getSeverityText = (severity: string): string => {
  switch (severity) {
    case 'severe':
      return 'serious';
    case 'moderate':
      return 'moderate';
    default:
      return 'mild';
  }
};