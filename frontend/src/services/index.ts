import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Fetch welcome message from the backend
export const getWelcomeMessage = async (): Promise<string> => {
  const response = await axios.get(`${BASE_URL}/`);
  return response.data as string;
};

// Get all todos
export const getAllTodos = async (): Promise<TodoList> => {
  const response = await axios.get(`${BASE_URL}/api/todos`);
  return response.data as TodoList;
};

// Add a new todo
export const addTodo = async (todo: TodoForm): Promise<Todo> => {
  const response = await axios.post(`${BASE_URL}/api/todos`, todo);
  return response.data as Todo;
};

// Update an existing todo
export const updateTodo = async (id: string, updatedTodo: TodoForm): Promise<Todo> => {
  const response = await axios.put(`${BASE_URL}/api/todos/${id}`, updatedTodo);
  return response.data as Todo;
};

// Delete a todo by ID
export const deleteTodo = async (id: string): Promise<boolean> => {
  const response = await axios.delete(`${BASE_URL}/api/todos/${id}`);
  return response.data as boolean;
};

// Clear all todos
export const clearTodos = async (): Promise<boolean> => {
  const response = await axios.delete(`${BASE_URL}/api/todos`);
  return response.data as boolean;
};