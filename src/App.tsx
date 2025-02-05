import './App.css';
import AddJournalForm from './components/AddJournalForm';
import Tabs from './components/Tabs';

const App = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200 py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Journal App</h1>
          <p className="text-gray-600 mt-2">
            Embrace each day with reflection: Capture your moments, chart your growth, and craft your journey, one story at a time.
          </p>
        </header>

        {/* Tabs */}
        <Tabs />

        {/* Form */}
        <AddJournalForm />
      </div>
    </div>
  );
};

export default App;
