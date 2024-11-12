package com.impact.todo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.impact.todo.models.Todo;

@Service
public class TodoService implements TodoServiceI {

    private final ArrayList<Todo> todos = new ArrayList<>();

    /**
     * Returns all todos in the list.
     * @return List of all todos.
     */
    @Override
    public List<Todo> getAllTodos() {
        return todos;
    }

    /**
     * Retrieves a todo by its ID.
     * @param id The ID of the todo.
     * @return The todo with the given ID, or null if not found.
     */
    @Override
    public Todo getTodoById(UUID id) {
        return todos.stream()
                .filter(todo -> todo.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    /**
     * Adds a new todo to the list.
     * @param todo The todo to add.
     * @return The added todo.
     */
    @Override
    public Todo addTodo(Todo todo) {
        todos.add(todo);
        return todo;
    }

    /**
     * Updates an existing todo with the given ID.
     * @param id The ID of the todo to update.
     * @param updatedTodo The updated todo data.
     * @return The updated todo, or null if not found.
     */
    @Override
    public Todo updateTodo(UUID id, Todo updatedTodo) {
        Todo existingTodo = getTodoById(id);
        if (existingTodo != null) {
            existingTodo.setTitle(updatedTodo.getTitle());
            existingTodo.setDescription(updatedTodo.getDescription());
            existingTodo.setCategory(updatedTodo.getCategory());
            existingTodo.setComplete(updatedTodo.isComplete());
        }
        return existingTodo;
    }

    /**
     * Deletes a todo by its ID.
     * @param id The ID of the todo to delete.
     * @return true if the todo was deleted, false if not found.
     */
    @Override
    public boolean deleteTodoById(UUID id) {
        return todos.removeIf(todo -> todo.getId().equals(id));
    }

    /**
     * Marks a todo as complete by its ID.
     * @param id The ID of the todo to mark as complete.
     * @return The updated todo, or null if not found.
     */
    @Override
    public Todo markComplete(UUID id) {
        Todo todo = getTodoById(id);
        if (todo != null) {
            todo.setComplete(true);
        }
        return todo;
    }

    /**
     * Clears all todos from the list.
     * @return true after clearing the todos.
     */
    @Override
    public boolean clearTodos() {
        todos.clear();
        return true;
    }
}