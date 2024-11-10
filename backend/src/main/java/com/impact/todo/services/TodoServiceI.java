package com.impact.todo.services;

import java.util.List;
import java.util.UUID;

import com.impact.todo.models.Todo;;

public interface TodoServiceI {

    List<Todo> getAllTodos();

    Todo getTodoById(UUID id);

    Todo addTodo(Todo todo);

    Todo updateTodo(UUID id, Todo updatedTodo);

    boolean deleteTodoById(UUID id);

    Todo markComplete(UUID id);

    void clearTodos();
}