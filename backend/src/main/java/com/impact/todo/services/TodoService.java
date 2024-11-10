package com.impact.todo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.impact.todo.models.Todo;

@Service
public class TodoService implements TodoServiceI {

    private final ArrayList<Todo> todos = new ArrayList<>();

    @Override
    public List<Todo> getAllTodos() {
        return todos;
    }

    @Override
    public Todo getTodoById(UUID id) {
        return todos.stream()
                .filter(todo -> todo.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @Override
    public Todo addTodo(Todo todo) {
        todos.add(todo);
        return todo;
    }

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

    @Override
    public boolean deleteTodoById(UUID id) {
        return todos.removeIf(todo -> todo.getId().equals(id));
    }

    @Override
    public Todo markComplete(UUID id) {
        Todo todo = getTodoById(id);
        if (todo != null) {
            todo.setComplete(true);
        }
        return todo;
    }

    @Override
    public boolean clearTodos() {
        todos.clear();
        return true;
    }
}
