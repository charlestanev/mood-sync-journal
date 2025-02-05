import { useState } from 'react';
import './App.css';
import AddJournalForm from './components/AddJournalForm';
import JournalList from './components/JournalList';
import Tabs from './components/Tabs';

const App = () => {
  const [currentTab, setCurrentTab] = useState('entries');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10 px-4"
      style={{ color: 'red' }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="card-body p-6 md:p-8">
            {/* Header */}
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4 font-lora">
                📖 MoodSync Journal
              </h1>
              <p className="text-gray-600 text-lg mb-2 font-medium">
                Capture Your Journey, Reflect Your Growth
              </p>
              <div className="divider divider-primary opacity-50"></div>
            </header>

            {/* Tabs */}
            <Tabs />

            {/* Form */}
            <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-6 md:p-8">
              {currentTab === 'add' ? (<AddJournalForm />) : (<JournalList />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;