package com.example.Paint_Back.Model;

public abstract class Shape {

    //center of shape
    private int id;
    private int x;
    private int y;
    private int rotateAngle;
    private int[] borderColor = new int[4];
    private int[] fillColor = new int[4];

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public int getX() {return x;}
    public void setX(int x) {this.x = x;}
    public int getY() {return y;}
    public void setY(int y) {this.y = y;}
    public int[] getBorderColor() {return borderColor;}
    public void setBorderColor(int[] borderColor) {this.borderColor = borderColor;}
    public int[] getFillColor() {return fillColor;}
    public void setFillColor(int[] fillColor) {this.fillColor = fillColor;}
    public int getRotateAngle() {return rotateAngle;}
    public void setRotateAngle(int rotateAngle) {this.rotateAngle = rotateAngle;}

}
