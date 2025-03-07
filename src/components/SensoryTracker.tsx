import React, { useState } from 'react';
import { useTranslation, formatDateNorwegian } from '../i18n/TranslationContext';

type SensoryType = 'Visual' | 'Auditory' | 'Tactile' | 'Movement' | 'Body Awareness';
type ResponseType = 'Seeking' | 'Avoiding' | 'Neutral';

interface SensoryEntry {
  sensoryType: SensoryType;
  responseType: ResponseType;
  environment: string;
  timestamp: Date;
}

export const SensoryTracker: React.FC = () => {
  const { translate } = useTranslation();
  const [selectedSensoryType, setSelectedSensoryType] = useState<SensoryType | null>(null);
  const [selectedResponseType, setSelectedResponseType] = useState<ResponseType | null>(null);
  const [environment, setEnvironment] = useState('');
  const [entries, setEntries] = useState<SensoryEntry[]>([]);

  const sensoryTypes: SensoryType[] = ['Visual', 'Auditory', 'Tactile', 'Movement', 'Body Awareness'];
  const responseTypes: ResponseType[] = ['Seeking', 'Avoiding', 'Neutral'];

  const handleSensoryTypeSelect = (type: SensoryType) => {
    setSelectedSensoryType(type);
  };

  const handleResponseTypeSelect = (type: ResponseType) => {
    setSelectedResponseType(type);
  };

  const handleEnvironmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnvironment(e.target.value);
  };

  const handleSaveEntry = () => {
    if (selectedSensoryType && selectedResponseType) {
      const newEntry: SensoryEntry = {
        sensoryType: selectedSensoryType,
        responseType: selectedResponseType,
        environment,
        timestamp: new Date(),
      };
      
      setEntries([newEntry, ...entries]);
      
      // Reset form
      setSelectedSensoryType(null);
      setSelectedResponseType(null);
      setEnvironment('');
    }
  };

  const getSensoryTypeIcon = (type: SensoryType): string => {
    switch (type) {
      case 'Visual': return '👁️';
      case 'Auditory': return '👂';
      case 'Tactile': return '✋';
      case 'Movement': return '🔄';
      case 'Body Awareness': return '🧠';
    }
  };

  const getResponseTypeColor = (type: ResponseType): string => {
    switch (type) {
      case 'Seeking': return 'bg-blue-200 text-blue-800';
      case 'Avoiding': return 'bg-red-200 text-red-800';
      case 'Neutral': return 'bg-teal-200 text-teal-800';
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">{translate('Sensory Input Tracker')}</h2>
      
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">{translate('Sensory Input Tracker')}</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {sensoryTypes.map(type => (
            <button
              key={type}
              className={`p-3 rounded-lg bg-teal-500 text-white flex flex-col items-center ${
                selectedSensoryType === type ? 'ring-2 ring-offset-2 ring-teal-500' : ''
              }`}
              onClick={() => handleSensoryTypeSelect(type)}
            >
              <span className="text-xl mb-1">{getSensoryTypeIcon(type)}</span>
              <span className="text-sm">{translate(type)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">{translate('Response Type')}</p>
        <div className="flex flex-wrap gap-2">
          {responseTypes.map(type => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedResponseType === type 
                  ? getResponseTypeColor(type) 
                  : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => handleResponseTypeSelect(type)}
            >
              {translate(type)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translate('Environment')}
        </label>
        <input
          type="text"
          value={environment}
          onChange={handleEnvironmentChange}
          placeholder={translate('e.g., Classroom, Playground, Cafeteria')}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={handleSaveEntry}
        disabled={!selectedSensoryType || !selectedResponseType}
        className={`w-full py-2 px-4 rounded-md text-white font-medium 
          ${(selectedSensoryType && selectedResponseType) 
            ? 'bg-teal-600 hover:bg-teal-700' 
            : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {translate('Save Entry')}
      </button>

      {entries.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">{translate('Recent entries')}</h3>
          <ul className="space-y-2">
            {entries.map((entry, index) => (
              <li key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{getSensoryTypeIcon(entry.sensoryType)}</span>
                    <span>{translate(entry.sensoryType)}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${getResponseTypeColor(entry.responseType)}`}>
                    {translate(entry.responseType)}
                  </span>
                </div>
                {entry.environment && (
                  <div className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">{translate('Environment')}:</span> {entry.environment}
                  </div>
                )}
                <div className="mt-1 text-xs text-gray-500 text-right">
                  {formatDateNorwegian(entry.timestamp)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};