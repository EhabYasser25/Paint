package com.example.Paint_Back.Model;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Stack;
import java.util.Vector;

@Component
public class Session {
    private ArrayList<Shape> shapes;
    private Stack<String[]> undoStack = new Stack<String[]>();;
    private Stack<String[]> redoStack = new Stack<String[]>();

    @Bean
    public ArrayList<Shape> shapes(){
        this.shapes = new ArrayList<Shape>();
        return this.shapes;
    }

    public ArrayList<Shape> getShapes() {
        return shapes;
    }

    public ArrayList<Shape> setShapes(ArrayList<Shape> shapes) {
        this.shapes = shapes;
        return this.shapes;
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

    public int getShapesNumber() {
        int number = 0;

        for(int i = 0; i < this.shapes.size(); i++){
            if(!this.shapes.get(i).getDeleted())
                number++;
        }

        return number;
    }

    public void destroy(){
        this.shapes.clear();
        this.undoStack.clear();
        this.redoStack.clear();
    }
}
