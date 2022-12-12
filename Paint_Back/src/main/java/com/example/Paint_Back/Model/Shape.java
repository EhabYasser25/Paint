package com.example.Paint_Back.Model;

public class Shape implements Cloneable{


    private String name, id, x, y, width, height, rotateAngle, strokeWidth, borderColor, fillColor;

    public Shape(String name, String id,String x, String y, String width, String height,
                 String rotateAngle, String strokeWidth, String borderColor, String fillColor){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.borderColor = borderColor;
        this.fillColor = fillColor;
        this.name = name;
        this.id = id;
        this.rotateAngle = rotateAngle;
        this.strokeWidth = strokeWidth;
    }

    public void setShapeProperties(String name, String id,String x, String y, String width, String height,
                                   String rotateAngle, String strokeWidth, String borderColor, String fillColor){
        this.x = x;
        this.y =y;
        this.width = width;
        this.height = height;
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

}
