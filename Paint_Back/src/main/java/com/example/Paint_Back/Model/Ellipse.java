package com.example.Paint_Back.Model;

public class Ellipse extends Shape {

    private int radius1;
    private int radius2;

    public Ellipse(int id, int x, int y, int radius1, int radius2, int[] borderColor, int[] fillColor) {
        this.setId(id);
        this.setX(x);
        this.setY(y);
        this.radius1 = radius1;
        this.radius2 = radius2;
        this.setBorderColor(borderColor);
        this.setFillColor(fillColor);
    }

}
