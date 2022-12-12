package com.example.Paint_Back.Model;

import com.example.Paint_Back.Controller.HttpService;

import java.io.FileWriter;


public class Save {

    public Save(HttpService httpservice) {   //dependency injection

        //File f = new File(".\\.\\.\\.\\.\\myJson.json");
        //System.out.println(f.delete());
        try(FileWriter file = new FileWriter("myJson.json")) {

            file.write(httpservice.getList().toJSONString());
            file.flush();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        System.out.println("done save");
    }


}
