package com.example.Paint_Back.Model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import java.io.FileOutputStream;


public class Save {

    public static String saveXml(Session currentSession, String destination) {

        Shape[] savedShapes = new Shape[currentSession.getShapesNumber()];

        int indexCounter =  0;
        for(Shape shape : currentSession.getShapes()){
            if(!shape.getDeleted()) {
                savedShapes[indexCounter++] = shape;
            }
        }
        for(Shape shape : savedShapes)
            System.out.println(shape.getName());

        try(FileOutputStream myFile = new FileOutputStream(destination)) {

            XmlMapper xmlmapper = new XmlMapper();
            byte[] xml = xmlmapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(savedShapes);
            myFile.write(xml);
            return "0";

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "1";
        }
    }
    public static String saveJson(Session currentSession, String destination) {

        Shape[] savedShapes = new Shape[currentSession.getShapesNumber()];

        int indexCounter =  0;
        for(Shape shape : currentSession.getShapes()){
            if(!shape.getDeleted()) {
                savedShapes[indexCounter++] = shape;
            }
        }

        for(Shape shape : savedShapes)
            System.out.println(shape.getName());

        try (FileOutputStream myFile = new FileOutputStream(destination)) {

            ObjectMapper mapper = new ObjectMapper();
            byte[] Obj = mapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(savedShapes);
            myFile.write(Obj);
            return "0";

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "1";
        }

    }
}