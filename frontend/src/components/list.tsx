import React, { ElementRef, useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "@app-services";

type Props = {
    todos: TodoList;
    onTodoUpdate: (updatedTodo: Todo) => void;
    onDeleteTodo: (id: string) => void;
};

export default function TodoList(props: Props) {
    const { todos, onDeleteTodo, onTodoUpdate } = props;
    const refModal = React.useRef<ElementRef<'dialog'>>(null);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    async function handleDeleteClick(id: string) {
        if (await deleteTodo(id)) {
            onDeleteTodo(id);
        }
    }

    const handleUpdateClick = (todo: Todo) => {
        setSelectedTodo(todo);
    };

    const handleModalClose = () => {
        if (refModal.current) {
            refModal.current.close();
        }
        setSelectedTodo(null);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedTodo && await updateTodo(selectedTodo.id, selectedTodo)) {
            onTodoUpdate(selectedTodo);
            handleModalClose();
        }
    };

    const handleComplete = async (todo: Todo) => {
        const updatedTodo = { ...todo, complete: !todo.complete };
        if (await updateTodo(todo.id, updatedTodo)) {
            onTodoUpdate(updatedTodo);
        }
    };

    useEffect(() => {
        if (refModal.current) {
            refModal.current.showModal();
        } else {
            handleModalClose();
        }
    }, [selectedTodo]);

    const handleInputChange = (field: keyof TodoForm, value: string) => {
        setSelectedTodo((prev) => prev ? { ...prev, [field]: value } : prev);
    };

    const renderUpdateModal = () => (
        <dialog ref={refModal} className="p-4 border rounded shadow-lg">
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <h2 className="text-lg font-bold">Update Todo</h2>

                <input
                    type="text"
                    value={selectedTodo?.category || ""}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    placeholder="Category"
                    className="border p-2 w-full"
                    required
                />

                <input
                    type="text"
                    value={selectedTodo?.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Title"
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    value={selectedTodo?.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Description"
                    className="border p-2 w-full"
                    required
                />

                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={handleModalClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                </div>
            </form>
        </dialog>
    );

    const renderTodo = (todo: Todo) => (
        <li key={todo.id} className="p-4 first-of-type:border-t border-b first-of-type:border-t-gray-200 border-b-gray-200 grid grid-rows-2 gap-2">

            <div className="flex justify-between items-center">
                <p className={`${todo.complete ? 'line-through' : ''}`}>
                    <strong className="text-lg font-semibold">{todo.title}</strong> - <span className="text-gray-600">{todo.description}</span> <span className="text-sm text-gray-500">({todo.category})</span>
                </p>

                <input
                    type="checkbox"
                    checked={todo.complete}
                    onChange={() => handleComplete(todo)}
                    className="mr-2 cursor-pointer"
                />

            </div>

            <div className="grid grid-cols-2">
                <button onClick={() => handleUpdateClick(todo)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
                <button onClick={() => handleDeleteClick(todo.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2">Delete</button>

            </div>
        </li>
    );

    return (
        <ul>
            {todos.map(renderTodo)}
            {selectedTodo && renderUpdateModal()}
        </ul>
    );
}