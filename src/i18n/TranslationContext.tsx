import { createContext, useContext, ReactNode } from 'react';
import { norwegianTranslations, TranslationKey } from './translations';

interface TranslationContextType {
  translate: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const translate = (key: string): string => {
    return norwegianTranslations[key as TranslationKey] || key;
  };

  return (
    <TranslationContext.Provider value={{ translate }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

// Utility function for date formatting in Norwegian
export function formatDateNorwegian(date: Date): string {
  return date.toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}