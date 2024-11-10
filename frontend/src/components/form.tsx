import React, { useEffect } from 'react'
import { addTodo } from '@app-services';

type Props = {
    onFormSubmit: (updatedTodos: Todo) => void;
}

export default function Form(props: Props) {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newTodo: TodoForm = {
            title,
            description,
            category,
        };

        try {
            const addedTodo = await addTodo(newTodo);
            props.onFormSubmit(addedTodo);
            setTitle("");
            setDescription("");
            setCategory("");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    useEffect(() => {

        if (title && description && category) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

    }, [title, setTitle, description])

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <input
                className='border border-gray-300 p-2 rounded-md outline-none focus:border-2 focus:border-blue-500'
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <br />
            <input
                className='border border-gray-300 p-2 rounded-md outline-none focus:border-2 focus:border-blue-500'
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <br />
            <textarea
                className='border border-gray-300 p-2 rounded-md outline-none focus:border-2 focus:border-blue-500'
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <br />
            <button
                disabled={disabled}
                className={`${disabled ? 'bg-gray-500' : 'bg-green-500'} text-white p-2 rounded-md`}
                type="submit">Add Todo</button>
        </form>
    )
}
