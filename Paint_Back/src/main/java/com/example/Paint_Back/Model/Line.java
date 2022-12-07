package com.example.Paint_Back.Model;

public class Line extends Shape {

    private int length;

    public Line(int id, int x, int y, int length, int rotateAngle, int[] borderColor, int[] fillColor) {
        this.setId(id);
        this.setX(x);
        this.setY(y);
        this.length = length;
        this.setRotateAngle(rotateAngle);
        this.setBorderColor(borderColor);
        this.setFillColor(fillColor);
    }

}
