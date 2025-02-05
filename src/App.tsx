import './App.css'
import AddJournalForm from './components/AddJournalForm'
import Tabs from './components/Tabs'

const App = () => {
  return (
    <>
      <div className='flex w-[640px] flex-col py-4 mx-auto bg-red-400'>
        <div className="flex flex-col gap-2 rounded-xl bg-white p-4">
          {/* header */}
          <header>
            <h1 className="mb-4 border-b border-gray-300 pb-3 text-2xl font-bold">
              Journal App
            </h1>
            <p>
              Embrace each day with reflection: Capture your moments, chart your growth, and
              craft your journey, one story at a time.
            </p>
          </header>
        </div>
        {/* tabs */}
        <Tabs />
        {/* from */}
        <AddJournalForm />

      </div>
    </>
  )
}

export default App