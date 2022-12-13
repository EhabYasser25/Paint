package com.example.Paint_Back.Model;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.FileOutputStream;
import java.util.Vector;


public class SaveJson {

    public SaveJson(Session CurrentSession) {   //dependency injection

        Vector<Shape> shapes = new Vector<>();

        for(int i = 0; i < CurrentSession.getShapes().size(); i++) {
            if(!CurrentSession.getShapes().get(i).isDeleted()) {
                shapes.add(CurrentSession.getShapes().get(i));
                shapes.lastElement().setId(String.valueOf(shapes.size() - 1));
            }

        }



        try (FileOutputStream myFile = new FileOutputStream("myJson.json")) {

            ObjectMapper mapper = new ObjectMapper();
            byte[] Obj = mapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(shapes);
            myFile.write(Obj);
            System.out.println("Save done");

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
}