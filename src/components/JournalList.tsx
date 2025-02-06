import { useEffect, useState } from 'react'
import { ImSad2, ImHappy2, ImNeutral2 } from 'react-icons/im';

const JournalList = () => {
    useEffect(() => {
        const hasJournals = localStorage.getItem('journals');
        const journalEntries = hasJournals ? JSON.parse(hasJournals) : [];
        setJournals(journalEntries);
    }, []);

    const [journals, setJournals] = useState([
        {
            id: '',
            title: '',
            emotion: '',
            body: '',
            createdAt: '',
        }
    ]);


    const initJournalState = {
        id: '',
        title: '',
        emotion: '',
        body: '',
        createdAt: '',
    };

    const [journal, setJournal] = useState(initJournalState);


    const onViewJournal = (journal: {
        id: string;
        title: string;
        emotion: string;
        body: string;
        createdAt: string;
    }) => {
        setJournal(journal);
    }

    const deleteJournal = (id: string) => {
        const newJournals = journals.filter(journal => journal.id !== id);
        setJournals(newJournals);
        setJournal(initJournalState);
        localStorage.setItem('journals', JSON.stringify(newJournals));
    }

    return (
        <>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Journal Entries</h1>

                {journals.length === 0 ? (
                    <p className="text-center text-gray-500">No journal entries found.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {journals.map(journal => (
                            <div
                                key={journal.id}
                                className="card shadow-xl bg-white rounded-lg p-6 border border-gray-200 hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out hover:bg-violet-50 hover:rotate-1 hover:rotate-1 hover:cursor-pointer"
                                onClick={() => onViewJournal(journal)}
                            >
                                <h2 className="text-2xl font-semibold text-primary mb-2 break-words truncate">
                                    {journal.title}
                                </h2>

                                <p className="text-lg font-medium text-gray-700 break-words">
                                    {journal.emotion}
                                </p>

                                <p className="text-gray-600 mt-3 text-ellipsis break-words ">
                                    {journal.body}
                                </p>

                                <p className="text-sm text-gray-400 mt-4 border-t pt-2 flex items-center">
                                    📅 Created on {new Date(journal.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div >

            {/* Journal View Modal */}
            {journal.id && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgb(29,35,42)] bg-opacity-60 backdrop-blur-sm z-[100] transition-opacity duration-300">
                    <div className="relative bg-white shadow-xl rounded-lg p-6 w-full max-w-lg transform transition-all scale-100 overflow-hidden">
                        {journal.emotion === '😔 Sad' ? (
                            < ImSad2
                                size={64}
                                className="absolute -left-3 -top-2 z-0 text-gray-200"
                            />
                        ) : journal.emotion === '😊 Happy' ? (
                            <ImHappy2
                                size={64}
                                className="absolute -left-3 -top-2 z-0 text-gray-200"
                            />
                        ) : (
                            <ImNeutral2
                                size={64}
                                className="absolute -left-3 -top-2 z-0 text-gray-200"
                            />
                        )}

                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setJournal(initJournalState)}
                        >
                            ✕
                        </button>

                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{journal.title}</h2>
                        <p className="text-lg font-semibold text-gray-600 mb-3">{journal.emotion}</p>
                        <p className="text-gray-700 mb-6 leading-relaxed">{journal.body}</p>
                        <p className="text-sm text-gray-400 mt-4 border-t pt-2 flex items-center">
                            📅 Created on {new Date(journal.createdAt).toLocaleDateString()}
                        </p>

                        <div className="flex">
                            <div className="flex flex-row gap-2 w-full">
                                <button
                                    className="btn btn-primary mt-4 px-6 py-2 shadow-md hover:shadow-lg transition-all w-1/2"
                                    onClick={() => deleteJournal(journal.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-primary mt-4 px-6 py-2 shadow-md hover:shadow-lg transition-all  w-1/2"
                                    onClick={() => setJournal(initJournalState)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}

export default JournalList