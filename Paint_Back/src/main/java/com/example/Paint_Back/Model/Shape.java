package com.example.Paint_Back.Model;

import java.util.ArrayList;

public class Shape implements Cloneable{


    private String name;
    private String id;
    private String x;
    private String y;
    private String width;
    private String height;
    private ArrayList<Integer> points;
    private String rotateAngle;
    private String strokeWidth;
    private String borderColor;
    private String fillColor;

    public Shape(String name, String id,String x, String y, String width, String height, ArrayList<Integer> points,
                 String rotateAngle, String strokeWidth, String borderColor, String fillColor){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.points = points;
        this.borderColor = borderColor;
        this.fillColor = fillColor;
        this.name = name;
        this.id = id;
        this.rotateAngle = rotateAngle;
        this.strokeWidth = strokeWidth;
    }

    public void setShapeProperties(String name, String id,String x, String y, String width, String height, ArrayList<Integer> points,
                                   String rotateAngle, String strokeWidth, String borderColor, String fillColor){
        this.x = x;
        this.y =y;
        this.width = width;
        this.height = height;
        this.points = points;
        this.borderColor = borderColor;
        this.fillColor = fillColor;
        this.name = name;
        this.id = id;
        this.rotateAngle = rotateAngle;
        this.strokeWidth = strokeWidth;
    }


    public String getStrokeWidth() { return strokeWidth;}

    public void setStrokeWidth(String strokeWidth) { this.strokeWidth = strokeWidth;}

    public String getX() {return x;}

    public void setX(String x) {this.x = x;}

    public String getY() {return y;}

    public void setY(String y) {this.y = y;}

    public String getWidth() {return width;}

    public void setWidth(String width) {this.width = width;}

    public String getHeight() {return height;}

    public void setHeight(String height) {this.height = height;}

    public String getBorderColor() {return borderColor;}

    public void setBorderColor(String borderColor) {this.borderColor = borderColor;}

    public String getFillColor() {return fillColor;}

    public void setFillColor(String fillColor) {this.fillColor = fillColor;}

    public String getId() {return id;}

    public void setId(String id) {this.id = id;}

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public String getRotateAngle() {return rotateAngle;}

    public void setRotateAngle(String rotateAngle) {this.rotateAngle = rotateAngle;}

    @Override
    public Object clone() throws CloneNotSupportedException {return super.clone();}

    public ArrayList<Integer> getPoints() {
        return points;
    }

    public void setPoints(ArrayList<Integer> points) {
        this.points = points;
    }
}
