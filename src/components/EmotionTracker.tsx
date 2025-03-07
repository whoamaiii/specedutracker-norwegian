import React, { useState } from 'react';
import { useTranslation, formatDateNorwegian } from '../i18n/TranslationContext';

type Emotion = 'Happy' | 'Calm' | 'Anxious' | 'Frustrated' | 'Excited';

interface EmotionEntry {
  emotion: Emotion;
  intensity: number;
  notes?: string;
  timestamp: Date;
}

export const EmotionTracker: React.FC = () => {
  const { translate } = useTranslation();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [intensity, setIntensity] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');
  const [entries, setEntries] = useState<EmotionEntry[]>([]);

  const emotions: Emotion[] = ['Happy', 'Calm', 'Anxious', 'Frustrated', 'Excited'];

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntensity(parseInt(e.target.value));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSaveEntry = () => {
    if (selectedEmotion) {
      const newEntry: EmotionEntry = {
        emotion: selectedEmotion,
        intensity,
        notes: notes || undefined,
        timestamp: new Date(),
      };
      
      setEntries([newEntry, ...entries]);
      
      // Reset form
      setSelectedEmotion(null);
      setIntensity(5);
      setNotes('');
    }
  };

  const getEmotionColor = (emotion: Emotion): string => {
    switch (emotion) {
      case 'Happy': return 'bg-green-500';
      case 'Calm': return 'bg-blue-500';
      case 'Anxious': return 'bg-yellow-500';
      case 'Frustrated': return 'bg-red-500';
      case 'Excited': return 'bg-purple-500';
    }
  };

  const getEmotionIcon = (emotion: Emotion): string => {
    switch (emotion) {
      case 'Happy': return '👍';
      case 'Calm': return '❤️';
      case 'Anxious': return '😟';
      case 'Frustrated': return '👎';
      case 'Excited': return '😊';
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">{translate('How are you feeling?')}</h2>
      
      <div className="grid grid-cols-5 gap-2 mb-4">
        {emotions.map(emotion => (
          <button
            key={emotion}
            className={`${getEmotionColor(emotion)} text-white p-4 rounded-lg flex flex-col items-center ${
              selectedEmotion === emotion ? 'ring-2 ring-offset-2 ring-blue-500' : ''
            }`}
            onClick={() => handleEmotionSelect(emotion)}
          >
            <span className="text-2xl">{getEmotionIcon(emotion)}</span>
            <span>{translate(emotion)}</span>
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translate('Intensity (1-10)')}
        </label>
        <div className="flex items-center">
          <span className="mr-2">1</span>
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={handleIntensityChange}
            className="flex-grow"
          />
          <span className="ml-2">10</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translate('Notes (optional)')}
        </label>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder={translate('What triggered this emotion?')}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={4}
        />
      </div>

      <button
        onClick={handleSaveEntry}
        disabled={!selectedEmotion}
        className={`w-full py-2 px-4 rounded-md text-white font-medium 
          ${selectedEmotion ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {translate('Save Entry')}
      </button>

      {entries.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">{translate('Recent entries')}</h3>
          <ul className="space-y-2">
            {entries.map((entry, index) => (
              <li key={index} className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${getEmotionColor(entry.emotion)}`}></span>
                  <span className="font-medium">{translate(entry.emotion)}</span>
                  <span className="mx-2">•</span>
                  <span>{translate('Intensity:')} {entry.intensity}</span>
                  <span className="ml-auto text-sm text-gray-500">
                    {formatDateNorwegian(entry.timestamp)}
                  </span>
                </div>
                {entry.notes && <p className="mt-1 text-sm text-gray-600">{entry.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};