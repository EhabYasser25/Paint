package com.example.Paint_Back.Model;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import java.io.FileReader;
import java.util.Vector;

public class LoadXml {

    private Session CurrentSession;
    public LoadXml(Session CurrentSession) {
        this.CurrentSession = CurrentSession;
    }

    Vector<Shape> shapes = new Vector<>();

    public Vector<Shape> LoadShapes() {
        try ( FileReader myFile = new FileReader(".\\.\\.\\.\\.\\myXml.xml") ) {

            XmlMapper xmlmapper = new XmlMapper();
            shapes = xmlmapper.readValue(myFile, Vector.class);
            System.out.println("done load xml");

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        CurrentSession.setShapes(shapes);
        return shapes;
    }
}