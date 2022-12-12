package com.example.Paint_Back.Model;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Stack;
import java.util.Vector;

@Component
public class Session {      //Singleton class
    private JSONArray ShapesList = new JSONArray();
    public JSONArray getShapesList() {return ShapesList;}
    private Vector<Shape> shapes;
    private Stack<String[]> undoStack = new Stack<String[]>();;
    private Stack<String[]> redoStack = new Stack<String[]>();

    //int i=0;
    public void AddShape (Shape shape) {
        JSONObject obj = new JSONObject();
        obj.put("name",shape.getName());
        obj.put("id",shape.getId());
        obj.put("x",shape.getX());
        obj.put("y",shape.getY());
        obj.put("width",shape.getWidth());
        obj.put("height",shape.getHeight());
        obj.put("rotateAngle",shape.getRotateAngle());
        obj.put("strokeWidth",shape.getStrokeWidth());
        obj.put("borderColor",shape.getBorderColor());
        obj.put("fillColor",shape.getFillColor());

        JSONObject obj2 = new JSONObject();
        obj2.put("shape",obj);
        if( shape.getId().equals("0") ) ShapesList.clear();
        ShapesList.add(obj2);

        //System.out.println(ShapesList.get(i++));
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