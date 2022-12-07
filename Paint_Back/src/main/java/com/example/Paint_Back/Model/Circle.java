package com.example.Paint_Back.Model;

public class Circle extends Shape{

    private int radius;

    public Circle(int id, int x, int y, int radius, int[] borderColor, int[] fillColor) {
        this.setId(id);
        this.setX(x);
        this.setY(y);
        this.radius = radius;
        this.setBorderColor(borderColor);
        this.setFillColor(fillColor);
    }

}
