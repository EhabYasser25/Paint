package com.example.Paint_Back.Model;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONObject;

import java.io.FileOutputStream;


public class Save {

    public Save(Session CurrentSession) {   //dependency injection

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("shape", CurrentSession.getShapes());

        try {
            FileOutputStream fos = new FileOutputStream("myJson.json");
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonObject);
            fos.write(json.getBytes());
            fos.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        System.out.println("Save done");
    }
}