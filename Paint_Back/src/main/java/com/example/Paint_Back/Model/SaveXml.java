package com.example.Paint_Back.Model;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import java.io.FileOutputStream;


public class SaveXml {

    public SaveXml(Session CurrentSession) {

        try(FileOutputStream myFile = new FileOutputStream("myXml.xml")) {

            XmlMapper xmlmapper = new XmlMapper();
            byte[] xml = xmlmapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(CurrentSession.getShapes());
            myFile.write(xml);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}