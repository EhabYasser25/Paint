package com.example.Paint_Back.Controller;

import com.example.Paint_Back.Model.Session;
import com.example.Paint_Back.Model.Shape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.Arrays;

@RestController
@RequestMapping("/")
public class HttpService {
    @Autowired
    private Session currentSession;
    public HttpService(Session session){
        this.currentSession = session;
    }

    @PostMapping("create")
    public void createNewShape(@RequestBody String instruction) throws CloneNotSupportedException{
        Shape newShape;
        String[] action = instruction.split(" ");
        if(currentSession.getShapes().size() == 0)
            newShape = new Shape(action[0], action[1], action[2], action[3], action[4], action[5], action[6]);
        else {
            newShape = (Shape) this.currentSession.getShapes().get(0).clone();
            newShape.setShapeProperties(action[0], action[1], action[2], action[3], action[4], action[5], action[6]);
        }
        this.currentSession.getShapes().add(newShape);
        this.currentSession.getUndoStack().add(new String[]{"delete", Integer.toString(this.currentSession.getShapes().size() - 1)});
        return;
    }

    @PostMapping("delete")
    public void deleteShape(@RequestBody String instruction){
        if(Integer.parseInt(instruction) > this.currentSession.getShapes().size() - 1)
            return;

        this.currentSession.getShapes().remove(Integer.parseInt(instruction));

        Shape shape = this.currentSession.getShapes().get(Integer.parseInt(instruction));
        this.currentSession.getUndoStack().push(new String[]{"move", instruction, shape.getX(), shape.getY()});
        shape.setX(instruction);
        shape.setY(instruction);
        return;
    }

    @PostMapping("move")
    public void moveShape(@RequestBody String instruction){
        String[] action = instruction.split(" ");
        if(Integer.parseInt(action[0]) > this.currentSession.getShapes().size() - 1)
            return;

        Shape shape = this.currentSession.getShapes().get(Integer.parseInt(action[0]));
        this.currentSession.getUndoStack().push(new String[]{"move", action[0], shape.getX(), shape.getY()});
        shape.setX(action[1]);
        shape.setY(action[2]);
        return;
    }

    @PostMapping("color")
    public void colorShape(@RequestBody String instruction){
        String[] action = instruction.split(" ");
        if(Integer.parseInt(action[0]) > this.currentSession.getShapes().size() - 1)
            return;

        Shape shape = this.currentSession.getShapes().get(Integer.parseInt(action[0]));
        this.currentSession.getUndoStack().push(new String[]{"color", action[0], shape.getStrokeColor(), shape.getFillColor()});
        shape.setStrokeColor(action[1]);
        shape.setFillColor(action[2]);
        return;
    }

    @PostMapping("resize")
    public void resizeShape(@RequestBody String instruction){
        String[] action = instruction.split(" ");
        if(Integer.parseInt(action[0]) > this.currentSession.getShapes().size() - 1)
            return;

        Shape shape = this.currentSession.getShapes().get(Integer.parseInt(action[0]));
        this.currentSession.getUndoStack().push(new String[]{"resize", action[0], shape.getWidth(), shape.getHeight()});
        shape.setWidth(action[1]);
        shape.setHeight(action[2]);
        return;
    }

    @GetMapping("undo")
    public ResponseEntity<String> undo(){
        if(this.currentSession.getUndoStack().empty())
            return new ResponseEntity<>("UndoNull", HttpStatus.BAD_REQUEST);

        String returnString = " ";
        String[] reverseAction = this.currentSession.getUndoStack().pop();
        Shape shape = this.currentSession.getShapes().get(Integer.parseInt(reverseAction[1]));
        switch (reverseAction[0]){
            case "move":
                String tempX = shape.getX();
                String tempY = shape.getY();
                returnString = "move " + reverseAction[1] + " " + reverseAction[2] + " " + reverseAction[3];
                shape.setX(reverseAction[2]);
                shape.setY(reverseAction[3]);
                reverseAction[2] = tempX;
                reverseAction[3] = tempY;
                break;

            case "color":
                String tempStrokeColor = shape.getStrokeColor();
                String tempFillColor = shape.getFillColor();
                returnString = "color " + reverseAction[1] + " " + reverseAction[2] + " " + reverseAction[3];
                shape.setStrokeColor(reverseAction[2]);
                shape.setFillColor(reverseAction[3]);
                reverseAction[2] = tempStrokeColor;
                reverseAction[3] = tempFillColor;
                break;

            case "resize":
                String tempWidth = shape.getWidth();
                String tempHeight = shape.getHeight();
                returnString = "resize " + reverseAction[1] + " " + reverseAction[2] + " " + reverseAction[3];
                shape.setWidth(reverseAction[2]);
                shape.setHeight(reverseAction[3]);
                reverseAction[2] = tempWidth;
                reverseAction[3] = tempHeight;
                break;
        }
        this.currentSession.getRedoStack().push(reverseAction);

        return new ResponseEntity<>(returnString, HttpStatus.OK);
    }

    @GetMapping("redo")
    public ResponseEntity<String> redo(){
        if(this.currentSession.getRedoStack().empty())
            return new ResponseEntity<>("RedoNull", HttpStatus.BAD_REQUEST);

        String returnString = " ";
        String[] reverseUndo = this.currentSession.getRedoStack().pop();
        Shape shape = this.currentSession.getShapes().get(Integer.parseInt(reverseUndo[1]));
        switch (reverseUndo[0]){
            case "move":
                String tempX = shape.getX();
                String tempY = shape.getY();
                returnString = "move " + reverseUndo[1] + " " + reverseUndo[2] + " " + reverseUndo[3];
                shape.setX(reverseUndo[2]);
                shape.setY(reverseUndo[3]);
                reverseUndo[2] = tempX;
                reverseUndo[3] = tempY;
                break;

            case "color":
                String tempStrokeColor = shape.getStrokeColor();
                String tempFillColor = shape.getFillColor();
                returnString = "color " + reverseUndo[1] + " " + reverseUndo[2] + " " + reverseUndo[3];
                shape.setStrokeColor(reverseUndo[2]);
                shape.setFillColor(reverseUndo[3]);
                reverseUndo[2] = tempStrokeColor;
                reverseUndo[3] = tempFillColor;
                break;

            case "resize":
                String tempWidth = shape.getWidth();
                String tempHeight = shape.getHeight();
                returnString = "resize " + reverseUndo[1] + " " + reverseUndo[2] + " " + reverseUndo[3];
                shape.setWidth(reverseUndo[2]);
                shape.setHeight(reverseUndo[3]);
                reverseUndo[2] = tempWidth;
                reverseUndo[3] = tempHeight;
                break;
        }

        this.currentSession.getUndoStack().push(reverseUndo);
        return new ResponseEntity<>(returnString, HttpStatus.OK);

    }

}
