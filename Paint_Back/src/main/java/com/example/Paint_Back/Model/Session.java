package com.example.Paint_Back.Model;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Stack;
import java.util.Vector;

@Component
public class Session {      //Singleton class
    private Vector<Shape> shapes = new Vector<>();
    private Stack<String[]> undoStack = new Stack<String[]>();;
    private Stack<String[]> redoStack = new Stack<String[]>();

    //int i=0;
    public void AddShape (Shape shape) {

        if(shape.getId().equals("0"))
            shapes.clear();
        shapes.add(shape);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("shape", shapes);

        System.out.println(shape.getPoints());
    }

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

    public Shape createNewShape(Shape shape){
        this.shapes.add(shape);
        return shape;
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