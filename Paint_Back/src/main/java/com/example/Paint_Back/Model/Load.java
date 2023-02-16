package com.example.Paint_Back.Model;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import java.io.FileReader;
import java.util.ArrayList;

public class Load {

    public static ArrayList<Shape> loadXml(String destination) {

        ArrayList<Shape>  loadedShapes = null;

        try ( FileReader myFile = new FileReader(destination) ) {

            XmlMapper mapper = new XmlMapper();
            loadedShapes = mapper.readValue(myFile, new TypeReference<ArrayList<Shape>>() {});

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }

        return loadedShapes;
    }

    public static ArrayList<Shape> loadJson(String destination) {

        ArrayList<Shape> loadedShapes = new ArrayList<>();

        try(FileReader myFile = new FileReader(destination)) {

            ObjectMapper mapper = new ObjectMapper();
            loadedShapes = mapper.readValue(myFile, new TypeReference<ArrayList<Shape>>() {});

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }

        return loadedShapes;
    }
}
