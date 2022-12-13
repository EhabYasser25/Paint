package com.example.Paint_Back.Model;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Stack;
import java.util.Vector;

@Component
public class Session {
    private Vector<Shape> shapes;
    private Stack<String[]> undoStack = new Stack<String[]>();;
    private Stack<String[]> redoStack = new Stack<String[]>();

    @Bean
    public Vector<Shape> shapes(){
        this.shapes = new Vector<Shape>();
        return this.shapes;
    }

    public Vector<Shape> getShapes() {
        return shapes;
    }

    public void setShapes(Vector<Shape> shapes) {
        this.shapes = shapes;
    }

    public Stack<String[]> getUndoStack() {
        return undoStack;
    }

    public void setUndoStack(Stack<String[]> undoStack) {
        this.undoStack = undoStack;
    }

    public Stack<String[]> getRedoStack() {
        return redoStack;
    }

    public void setRedoStack(Stack<String[]> redoStack) {
        this.redoStack = redoStack;
    }
}
