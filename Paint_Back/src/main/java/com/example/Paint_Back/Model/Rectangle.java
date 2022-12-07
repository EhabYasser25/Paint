package com.example.Paint_Back.Model;

public class Rectangle extends Shape{

    private int length;
    private int width;

    public Rectangle(int id, int x, int y, int length, int width, int rotateAngle, int[] borderColor, int[] fillColor) {
        this.setId(id);
        this.setX(x);
        this.setY(y);
        this.length = length;
        this.width = width;
        this.setRotateAngle(rotateAngle);
        this.setBorderColor(borderColor);
        this.setFillColor(fillColor);
    }

}
