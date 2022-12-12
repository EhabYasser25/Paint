package com.example.Paint_Back.Model;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import java.io.FileReader;



public class Load {


    public JSONArray LoadtoFront(){
        System.out.println("received");
        return List;
    }

    JSONArray List;
    public JSONArray LoadShapes(){
        JSONParser parser = new JSONParser();
        try(FileReader file = new FileReader(".\\.\\.\\.\\.\\myJson.json")){
            Object obj = parser.parse(file);
            List = (JSONArray) obj;
            System.out.println(List);
            //.forEach(CurrentObj ->function((JSONObject) CurrentObj));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        System.out.println("done load");
        return List;
    }
    /*void function(JSONObject CurrentObj){
        JSONObject JsonObj = (JSONObject) CurrentObj.get("shape");
        System.out.println(JsonObj);
    }*/



}
