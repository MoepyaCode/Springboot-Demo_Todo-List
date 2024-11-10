package com.impact.todo.service;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.impact.todo.models.Todo;
import com.impact.todo.services.TodoService;

@SpringBootTest
public class TodoServiceTest {

    @Autowired
    private TodoService todoService;

    private Todo todo;

    @BeforeEach
    public void setUp() {
        todo = new Todo("Test Title", "Test Description", "Work");
        todoService.clearTodos();
    }

    @Test
    public void testAddTodo() {
        Todo addedTodo = todoService.addTodo(todo);

        assertNotNull(addedTodo.getId());
        assertEquals("Test Title", addedTodo.getTitle());
        assertEquals("Test Description", addedTodo.getDescription());
    }

    @Test
    public void testGetAllTodos() {
        todoService.addTodo(todo);
        List<Todo> todos = todoService.getAllTodos();

        assertFalse(todos.isEmpty());
        assertEquals(1, todos.size());
    }

    @Test
    public void testGetTodoById() {
        Todo addedTodo = todoService.addTodo(todo);
        UUID id = addedTodo.getId();
        Todo retrievedTodo = todoService.getTodoById(id);

        assertNotNull(retrievedTodo);
        assertEquals(id, retrievedTodo.getId());
        assertEquals("Test Title", retrievedTodo.getTitle());
    }

    @Test
    public void testUpdateTodo() {
        Todo addedTodo = todoService.addTodo(todo);
        UUID id = addedTodo.getId();
        Todo updatedTodo = new Todo("Updated Title", "Updated Description", "Personal");
        Todo result = todoService.updateTodo(id, updatedTodo);

        assertNotNull(result);
        assertEquals("Updated Title", result.getTitle());
        assertEquals("Updated Description", result.getDescription());
        assertEquals("Personal", result.getCategory());
    }

    @Test
    public void testDeleteTodo() {
        Todo addedTodo = todoService.addTodo(todo);
        UUID id = addedTodo.getId();
        boolean deleted = todoService.deleteTodoById(id);

        assertTrue(deleted);
        assertNull(todoService.getTodoById(id));
    }

    @Test
    public void testMarkTodoAsComplete() {
        Todo addedTodo = todoService.addTodo(todo);
        UUID id = addedTodo.getId();
        Todo markedTodo = todoService.markComplete(id);
        
        assertNotNull(markedTodo);
        assertTrue(markedTodo.isComplete());
    }
}
