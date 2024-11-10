import React from 'react';
import { getAllTodos } from '@app-services';
import { Form, TodoList } from '@app-components';

function App() {
  const [todos, setTodos] = React.useState<TodoList>([]);

  const onFormSubmit = (updatedTodo: Todo) => {
    setTodos([...todos, updatedTodo]);
  }

  const onTodoUpdate = (updatedTodo: Todo) => setTodos(
    prevTodos => prevTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
  )

  const onDeleteTodo = (id: string) => setTodos(todos.filter(todo => todo.id !== id));

  const getTasksCount = () => todos.filter(todo => !todo.complete).length;

  React.useEffect(() => {

    const fetchTodos = async () => {
      try {
        const todoList = await getAllTodos();
        setTodos(todoList);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [todos]);


  return (
    <main className='min-h-screen px-6 py-10 overflow-hidden grid place-items-center'>

      <section className='grid grid-cols-1 gap-[2rem] w-full max-w-[640px]'>
        <h1 className='font-black text-[24px] text-slate-800 text-center leading-[18px] tracking-[.24px] uppercase'>Todo List ({getTasksCount()})</h1>

        <Form onFormSubmit={onFormSubmit} />

        <h2
          className='font-bold text-[18px] text-slate-800 text-center leading-[18px] tracking-[.24px] uppercase'
        >
          {todos.length === 0 ? "Create some tasks" : "Here are your tasks!"}
        </h2>

        <TodoList onTodoUpdate={onTodoUpdate} onDeleteTodo={onDeleteTodo} todos={todos} />
      </section>

    </main>
  );
}

export default App;