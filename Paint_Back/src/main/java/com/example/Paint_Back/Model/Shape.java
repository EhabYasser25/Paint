package com.example.Paint_Back.Model;

public class Shape implements Cloneable{
    private String x, y, width, height;
    private String strokeColor, fillColor, shapeType;
    private int id;

    public Shape(String shapeType, String x, String y, String width, String height, String strokeColor, String fillColor){
        this.x = x;
        this.y =y;
        this.width = width;
        this.height = height;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.shapeType = shapeType;
    }

    public void setShapeProperties(String shapeType, String x, String y, String width, String height, String strokeColor, String fillColor){
        this.x = x;
        this.y =y;
        this.width = width;
        this.height = height;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.shapeType = shapeType;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getStrokeColor() {
        return strokeColor;
    }

    public void setStrokeColor(String strokeColor) {
        this.strokeColor = strokeColor;
    }

    public String getFillColor() {
        return fillColor;
    }

    public void setFillColor(String fillColor) {
        this.fillColor = fillColor;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getShapeType() {
        return shapeType;
    }

    public void setShapeType(String shapeType) {
        this.shapeType = shapeType;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

}
