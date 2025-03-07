import React, { useState } from 'react';
import { useTranslation, formatDateNorwegian } from '../i18n/TranslationContext';

interface BehaviorEntry {
  description: string;
  duration: number;
  antecedent: string;
  consequence: string;
  timestamp: Date;
}

export const BehaviorTracker: React.FC = () => {
  const { translate } = useTranslation();
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('5');
  const [antecedent, setAntecedent] = useState('');
  const [consequence, setConsequence] = useState('');
  const [entries, setEntries] = useState<BehaviorEntry[]>([]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };

  const handleAntecedentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAntecedent(e.target.value);
  };

  const handleConsequenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConsequence(e.target.value);
  };

  const handleSaveEntry = () => {
    if (description) {
      const newEntry: BehaviorEntry = {
        description,
        duration: parseInt(duration),
        antecedent,
        consequence,
        timestamp: new Date(),
      };
      
      setEntries([newEntry, ...entries]);
      
      // Reset form
      setDescription('');
      setDuration('5');
      setAntecedent('');
      setConsequence('');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">{translate('Behavior Tracker')}</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translate('Behavior Description')}
        </label>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder={translate('Describe the behavior')}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translate('Duration (minutes)')}
        </label>
        <div className="flex items-center">
          <span className="mr-2 text-gray-500">⏱️</span>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={handleDurationChange}
            className="w-24 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translate('What happened before? (Antecedent)')}
        </label>
        <textarea
          value={antecedent}
          onChange={handleAntecedentChange}
          placeholder={translate('What triggered this behavior?')}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translate('What happened after? (Consequence)')}
        </label>
        <textarea
          value={consequence}
          onChange={handleConsequenceChange}
          placeholder={translate('How was the situation resolved?')}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>

      <button
        onClick={handleSaveEntry}
        disabled={!description}
        className={`w-full py-2 px-4 rounded-md text-white font-medium 
          ${description ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {translate('Save Entry')}
      </button>

      {entries.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">{translate('Recent entries')}</h3>
          <ul className="space-y-3">
            {entries.map((entry, index) => (
              <li key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex justify-between items-start">
                  <span className="font-medium">{entry.description}</span>
                  <span className="text-sm text-gray-500">
                    {formatDateNorwegian(entry.timestamp)}
                  </span>
                </div>
                <div className="mt-1 text-sm">
                  <span className="text-gray-700">
                    {translate('Duration (minutes)')}:
                  </span> {entry.duration}
                </div>
                {entry.antecedent && (
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-700">
                      {translate('What happened before? (Antecedent)')}:
                    </span>
                    <p className="text-sm text-gray-600">{entry.antecedent}</p>
                  </div>
                )}
                {entry.consequence && (
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-700">
                      {translate('What happened after? (Consequence)')}:
                    </span>
                    <p className="text-sm text-gray-600">{entry.consequence}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};