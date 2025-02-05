import { useEffect, useState } from 'react'

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
                                className="card shadow-xl bg-white rounded-lg p-6 border border-gray-200"
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
            </div>
        </>
    );

}

export default JournalList