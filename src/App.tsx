import React, { useState } from 'react';
import { TranslationProvider } from './i18n/TranslationContext';
import { EmotionTracker } from './components/EmotionTracker';
import { BehaviorTracker } from './components/BehaviorTracker';
import { SensoryTracker } from './components/SensoryTracker';

type ActiveTab = 'emotions' | 'behavior' | 'sensory' | 'stats' | 'chat' | 'settings';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('emotions');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'emotions':
        return <EmotionTracker />;
      case 'behavior':
        return <BehaviorTracker />;
      case 'sensory':
        return <SensoryTracker />;
      case 'stats':
        return <div className="p-6 text-center">Statistikk kommer snart!</div>;
      case 'chat':
        return <div className="p-6 text-center">Chatfunksjon kommer snart!</div>;
      case 'settings':
        return <div className="p-6 text-center">Innstillinger kommer snart!</div>;
      default:
        return <EmotionTracker />;
    }
  };

  return (
    <TranslationProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">SpecEduTracker</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            {renderTabContent()}
          </div>
        </main>

        <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-around">
              <button 
                className={`py-4 flex flex-col items-center text-xs ${activeTab === 'emotions' ? 'text-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('emotions')}
              >
                <span className="text-xl">❤️</span>
                <span>Følelser</span>
              </button>
              <button 
                className={`py-4 flex flex-col items-center text-xs ${activeTab === 'behavior' ? 'text-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('behavior')}
              >
                <span className="text-xl">🔍</span>
                <span>Atferd</span>
              </button>
              <button 
                className={`py-4 flex flex-col items-center text-xs ${activeTab === 'sensory' ? 'text-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('sensory')}
              >
                <span className="text-xl">👁️</span>
                <span>Sensorisk</span>
              </button>
              <button 
                className={`py-4 flex flex-col items-center text-xs ${activeTab === 'stats' ? 'text-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('stats')}
              >
                <span className="text-xl">📊</span>
                <span>Statistikk</span>
              </button>
              <button 
                className={`py-4 flex flex-col items-center text-xs ${activeTab === 'chat' ? 'text-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('chat')}
              >
                <span className="text-xl">💬</span>
                <span>Chat</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </TranslationProvider>
  );
};

export default App;