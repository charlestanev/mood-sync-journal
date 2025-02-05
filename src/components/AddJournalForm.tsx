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
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onFormSubmit = (data: FieldValues) => {
        console.log(data);
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className='flex flex-col gap-4 p-4 rounded-xl w-full'>

                {/* Title */}
                <label className="input input-bordered flex items-center gap-2 w-full">
                    Journal Title
                    <input
                        type="text"
                        className="grow"
                        placeholder="Give your journey entry a title"
                        {...register('title')}
                    />
                </label>
                {errors.title &&
                    <p className="text-red-500 ">{errors.title.message}</p>
                }

                {/* Feeling */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor='emotions'
                        className="form-control w-full flex items-center gap-2">
                        How are you feeling today ?
                    </label>
                    <select
                        id='emotions'
                        className="select select-bordered w-full"
                        {...register('emotion')}>
                        <option selected>Happy</option>
                        <option>Neutral</option>
                        <option>Sad</option>
                    </select>
                </div>
                {errors.emotion &&
                    <p className="text-red-500 ">{errors.emotion.message}</p>
                }

                {/* Textarea */}
                <textarea
                    className="textarea textarea-bordered h-32 resize-y w-full"
                    placeholder="Write something"
                    rows={10}
                    {...register('body')}
                >
                </textarea>
                {errors.body &&
                    <p className="text-red-500 ">{errors.body.message}</p>
                }

                <button
                    type="button"
                    className="btn btn-primary w-full"
                >Save Journal</button>

            </form>
        </>
    )
}

export default AddJournalForm