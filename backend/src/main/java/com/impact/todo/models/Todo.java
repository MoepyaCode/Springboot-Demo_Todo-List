package com.impact.todo.models;

import java.util.UUID;

public class Todo {
    private final UUID id;
    private String title;
    private String description;
    private String category;
    private boolean complete;

    public Todo(String title, String description, String category) {
        this.id = UUID.randomUUID();
        this.title = title;
        this.description = description;
        this.category = category;
        this.complete = false;
    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }
}