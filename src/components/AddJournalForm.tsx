import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    title: z
        .string({ required_error: 'Title is required !' })
        .min(3, { message: 'Title must be at least 3 characters !' })
        .max(100, { message: 'Title must be at most 100 characters !' }),
    emotion: z
        .string({ required_error: 'Please specify how are you feeling today !' })
        .min(3, { message: 'Emotion field must be at least 3 characters !' })
        .max(100, { message: 'Emotion field must be at most 100 characters !' }),
    body: z
        .string({ required_error: 'Please white something for your journal !' })
        .min(10, { message: 'Journal entry must be at least 10 characters !' })
    ,
});

type FormData = z.infer<typeof schema>;

const AddJournalForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onFormSubmit = (data: FieldValues) => {
        // 1 create a uniq id for the new journal entry
        const uuid = crypto.randomUUID();
        data.id = uuid;

        // 2 add the current timestapmp for the entry
        const now = new Date();
        data.createdAt = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        // 3 retrieve the entries from storage
        const hasJournals = localStorage.getItem('journals');
        const journalEntries = hasJournals ? JSON.parse(hasJournals) : [];

        // 4 save the new entry to the stogare
        journalEntries.push(data);
        const newEntry = JSON.stringify(journalEntries);
        localStorage.setItem('journals', newEntry);
        openDialog();
        reset();
    }

    const openDialog = () => {
        const modal = document.getElementById('success_modal');
        if (modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    }

    return (
        <>
            <dialog id="success_modal" className="modal">
                <div className="modal-box text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="font-bold text-2xl mb-2">Entry Saved!</h3>
                    <p className="py-4 text-gray-600">Your memories are safely stored</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-success btn-wide">Continue</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                {/* Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg font-medium">Journal Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Today's highlights..."
                        className="input input-bordered input-lg focus:ring-2 focus:ring-primary"
                        {...register('title')}
                    />
                    {errors.title && (
                        <div className="alert alert-error mt-2 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.title.message}</span>
                        </div>
                    )}
                </div>

                {/* Feeling */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg font-medium">Today's Mood</span>
                    </label>
                    <select
                        className="select select-bordered select-lg focus:ring-2 focus:ring-primary"
                        {...register('emotion')}
                    >
                        <option className="flex items-center gap-2">
                            😊 Happy
                        </option>
                        <option>
                            😐 Neutral
                        </option>
                        <option>
                            😔 Sad
                        </option>
                    </select>
                    {errors.emotion && (
                        <div className="alert alert-error mt-2 py-2">
                            {/* Same error icon as above */}
                            <span>{errors.emotion.message}</span>
                        </div>
                    )}
                </div>

                {/* Journal Entry */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg font-medium">Your Thoughts</span>
                    </label>
                    <textarea
                        placeholder="Pour your heart out..."
                        className="textarea textarea-bordered h-48 textarea-lg focus:ring-2 focus:ring-primary"
                        {...register('body')}
                    />
                    {errors.body && (
                        <div className="alert alert-error mt-2 py-2">
                            {/* Same error icon as above */}
                            <span>{errors.body.message}</span>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary btn-block btn-lg shadow-lg hover:shadow-xl transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save Entry
                </button>
            </form>
        </>
    )
}

export default AddJournalForm