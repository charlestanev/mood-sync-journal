import './App.css'
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
        <form className='flex flex-col gap-4 p-4 rounded-xl w-full'>
          <label className="input input-bordered flex items-center gap-2 w-full">
            Journal Title
            <input
              type="text"
              className="grow"
              placeholder="Give your journey entry a title" />
          </label>

          <div className="flex flex-col gap-2">
            <label
              htmlFor='emotions'
              className="form-control w-full flex items-center gap-2">
              How are you feeling today ?
            </label>
            <select
              id='emotions'
              className="select select-bordered w-full">
              <option selected>Happy</option>
              <option>Neutral</option>
              <option>Sad</option>
            </select>
          </div>

          <textarea
            className="textarea textarea-bordered h-32 resize-y w-full"
            placeholder="Write something"
            rows={10}>
          </textarea>

          <button
            type="button"
            className="btn btn-primary w-full"
          >Save Journal</button>

        </form>

      </div>
    </>
  )
}

export default App