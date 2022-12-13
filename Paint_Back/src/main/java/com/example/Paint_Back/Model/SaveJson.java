package com.example.Paint_Back.Model;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.FileOutputStream;


public class SaveJson {

    public SaveJson(Session CurrentSession) {   //dependency injection


        try (FileOutputStream myFile = new FileOutputStream("myJson.json")) {

            ObjectMapper mapper = new ObjectMapper();
            byte[] Obj = mapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(CurrentSession.getShapes());
            myFile.write(Obj);
            System.out.println("Save done");

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
}