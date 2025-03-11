import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../lib/theme';

interface SettingsProps {
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useThemeStore();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' }
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold dark:text-white">{t('settings.title')}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-medium mb-2 dark:text-white">{t('settings.notifications')}</h3>
            <label className="flex items-center gap-2 dark:text-gray-300">
              <input type="checkbox" className="rounded dark:bg-gray-700" />
              <span>Enable desktop notifications</span>
            </label>
          </div>

          <div>
            <h3 className="font-medium mb-2 dark:text-white">{t('settings.language')}</h3>
            <select 
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
              value={i18n.language}
              onChange={handleLanguageChange}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-medium mb-2 dark:text-white">{t('settings.theme')}</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={theme === 'light' ? 'default' : 'secondary'} 
                size="sm" 
                className="w-full"
                onClick={() => setTheme('light')}
              >
                Light
              </Button>
              <Button 
                variant={theme === 'dark' ? 'default' : 'secondary'} 
                size="sm" 
                className="w-full"
                onClick={() => setTheme('dark')}
              >
                Dark
              </Button>
              <Button 
                variant={theme === 'system' ? 'default' : 'secondary'} 
                size="sm" 
                className="w-full"
                onClick={() => setTheme('system')}
              >
                System
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 dark:text-white">{t('settings.privacy')}</h3>
            <label className="flex items-center gap-2 dark:text-gray-300">
              <input type="checkbox" className="rounded dark:bg-gray-700" defaultChecked />
              <span>Save chat history</span>
            </label>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 p-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>{t('settings.cancel')}</Button>
          <Button onClick={onClose}>{t('settings.save')}</Button>
        </div>
      </div>
    </div>
  );
}