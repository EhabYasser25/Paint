package com.example.Paint_Back.Model;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.FileReader;
import java.util.Vector;

public class LoadJson {
    private Session CurrentSession;
    public LoadJson(Session CurrentSession) {
        this.CurrentSession = CurrentSession;
    }

    public Vector<Shape> LoadShapes() {

        Vector<Shape> shapes = new Vector<>();

        try(FileReader myFile = new FileReader(".\\.\\.\\.\\.\\myJson.json")) {

            ObjectMapper mapper = new ObjectMapper();
            shapes = mapper.readValue(myFile, Vector.class);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        CurrentSession.setShapes(shapes);
        return shapes;
    }
}