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
        reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
                {/* Title */}
                <div>
                    <label className="label font-semibold text-gray-700">Journal Title</label>
                    <input type="text" className="input input-bordered w-full" {...register('title')} />
                    {errors.title && (
                        <p className="text-red-700 bg-red-100 border border-red-300 rounded-md px-3 py-1 mt-1 flex items-center gap-2">
                            ⚠️ {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Feeling */}
                <div>
                    <label className="label font-semibold text-gray-700">How are you feeling today?</label>
                    <select className="select select-bordered w-full" {...register('emotion')}>
                        <option>Happy</option>
                        <option>Neutral</option>
                        <option>Sad</option>
                    </select>
                    {errors.emotion && (
                        <p className="text-red-700 bg-red-100 border border-red-300 rounded-md px-3 py-1 mt-1 flex items-center gap-2">
                            ⚠️ {errors.emotion.message}
                        </p>
                    )}
                </div>

                {/* Journal Entry */}
                <div>
                    <label className="label font-semibold text-gray-700">Journal Entry</label>
                    <textarea
                        placeholder='Share your story here...'
                        className="textarea textarea-bordered w-full h-32 resize-none"
                        {...register('body')} />
                    {errors.body && (
                        <p className="text-red-700 bg-red-100 border border-red-300 rounded-md px-3 py-1 mt-1 flex items-center gap-2">
                            ⚠️ {errors.body.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    Save Journal
                </button>
            </form>
        </>
    )
}

export default AddJournalForm