package com.example.Paint_Back.Model;

import java.io.FileWriter;


public class Save {

    public Save(Session CurrentSession) {   //dependency injection

        try(FileWriter file = new FileWriter("myJson.json")) {

            file.write(CurrentSession.getShapesList().toJSONString());
            file.flush();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        System.out.println("Save done");
    }
}