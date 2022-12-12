package com.example.Paint_Back.Model;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import java.io.FileReader;

public class Load {


    public Object LoadShapes(){
        JSONParser parser = new JSONParser();
        Object jsonObject;
        try(FileReader file = new FileReader(".\\.\\.\\.\\.\\myJson.json")){
            jsonObject = parser.parse(file);
            System.out.println(jsonObject);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        System.out.println("done load");
        return jsonObject;
    }
}