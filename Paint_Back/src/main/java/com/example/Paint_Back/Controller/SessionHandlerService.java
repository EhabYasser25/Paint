package com.example.Paint_Back.Controller;

import com.example.Paint_Back.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;


@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/")
public class SessionHandlerService {
    @Autowired
    private Session currentSession;
    public SessionHandlerService(Session session){
        this.currentSession = session;
    }

    @GetMapping("startNewSession")
    public void startNewSession() {
        this.currentSession.destroy();
    }
    @PostMapping("create")
    public void createNewShape(@RequestBody Shape shape) {

        if(shape.getId().equals("0"))
            this.currentSession.getShapes().clear();

        if(Integer.parseInt(shape.getId()) == this.currentSession.getShapes().size())
            this.currentSession.getShapes().add(shape);

        else
            this.currentSession.getShapes().get(Integer.parseInt(shape.getId())).setDeleted(false);


        this.currentSession.getUndoStack().add(new String[]{"delete", shape.getId()});

        this.currentSession.getRedoStack().clear();

    }

    @PostMapping("copy")
    public void createNewShape(@RequestBody String instruction) throws CloneNotSupportedException {

        if(Integer.parseInt(instruction) < 0 || Integer.parseInt(instruction) >= this.currentSession.getShapes().size())
            return;

        Shape newShape = (Shape) this.currentSession.getShapes().get(Integer.parseInt(instruction)).clone();
        newShape.setId(Integer.toString(this.currentSession.getShapes().size()));
        newShape.setX(Float.toString(Float.parseFloat(newShape.getX()) + 50));
        newShape.setY(Float.toString(Float.parseFloat(newShape.getY()) + 50));
        this.currentSession.getShapes().add(newShape);
        this.currentSession.getUndoStack().add(new String[]{"delete", newShape.getId()});
        this.currentSession.getRedoStack().clear();

    }

    @PostMapping("restore")
    public void restoreShape(@RequestBody String instruction){
        if(Integer.parseInt(instruction) < 0 || Integer.parseInt(instruction) >= this.currentSession.getShapes().size())
            return;

        this.currentSession.getUndoStack().push(new String[]{"delete", instruction});

        this.currentSession.getShapes().get(Integer.parseInt(instruction)).setDeleted(false);

    }
    @PostMapping("delete")
    public void deleteShape(@RequestBody String instruction){

        if(Integer.parseInt(instruction) < 0 || Integer.parseInt(instruction) >= this.currentSession.getShapes().size() )
            return;

        String[] push = {"create", instruction};

        if(!this.currentSession.getUndoStack().empty() && Arrays.equals(push, this.currentSession.getUndoStack().peek()))
            return;

        this.currentSession.getUndoStack().push(push);

        this.currentSession.getShapes().get(Integer.parseInt(instruction)).setDeleted(true);

        this.currentSession.getRedoStack().clear();
    }


    public void reDeleteShape(String instruction){
        if(Integer.parseInt(instruction) < 0 || Integer.parseInt(instruction) >= this.currentSession.getShapes().size() )
            return;
        this.currentSession.getUndoStack().push(new String[]{"create", instruction});
        this.currentSession.getShapes().get(Integer.parseInt(instruction)).setDeleted(true);

    }

    @PostMapping("change")
    public void changeShape(@RequestBody String instruction){
        System.out.println(instruction);
        String[] action = instruction.split(" ");
        if(Integer.parseInt(action[0]) > this.currentSession.getShapes().size() - 1)
            return;

        Shape shape = this.currentSession.getShapes().get(Integer.parseInt(action[0]));

        System.out.println(shape.getWidth());

        this.currentSession.getUndoStack().push(new String[]{"change", shape.getId(), shape.getX(), shape.getY(), shape.getWidth(), shape.getHeight()
                , shape.getRotateAngle(), shape.getStrokeWidth(), shape.getBorderColor(), shape.getFillColor()});

        System.out.println(String.join(" ", this.currentSession.getUndoStack().peek()));
        shape.setX(action[1]);
        shape.setY(action[2]);
        shape.setWidth(action[3]);
        shape.setHeight(action[4]);
        shape.setRotateAngle(action[5]);
        shape.setStrokeWidth(action[6]);
        shape.setBorderColor(action[7]);
        shape.setFillColor(action[8]);
        this.currentSession.getRedoStack().clear();
        return;
    }

    @GetMapping("undo")
    public ResponseEntity<String> undo() throws CloneNotSupportedException {
        if(this.currentSession.getUndoStack().empty())
            return new ResponseEntity<>("UndoNull", HttpStatus.OK);

        String returnString = " ";
        String[] reverseAction = this.currentSession.getUndoStack().pop();
        Shape shape;
        switch (reverseAction[0]){

            case "create":
                shape = this.currentSession.getShapes().get(Integer.parseInt(reverseAction[1]));
                returnString = "create " + reverseAction[1];
                this.restoreShape(reverseAction[1]);
                this.currentSession.getUndoStack().pop();
                reverseAction[0] = "delete";
                break;

            case "delete":
                shape = this.currentSession.getShapes().get(Integer.parseInt(reverseAction[1]));
                returnString = "delete " + reverseAction[1];
                this.reDeleteShape(reverseAction[1]);
                this.currentSession.getUndoStack().pop();
                reverseAction[0] = "create";
                break;

            case "change":
                shape = this.currentSession.getShapes().get(Integer.parseInt(reverseAction[1]));
                String tempX = shape.getX();
                String tempY = shape.getY();
                String tempWidth = shape.getWidth();
                String tempHeight = shape.getHeight();
                String tempStrokeWidth = shape.getStrokeWidth();
                String tempRotateAngle = shape.getRotateAngle();
                String tempStrokeColor = shape.getBorderColor();
                String tempFillColor = shape.getFillColor();
                returnString = "change " + reverseAction[1] + " " + reverseAction[2] + " " + reverseAction[3] + " " + reverseAction[4] + " " + reverseAction[5] + " " + reverseAction[6] + " " + reverseAction[7] + " " + reverseAction[8] + " " + reverseAction[9];
                shape.setX(reverseAction[2]);
                shape.setY(reverseAction[3]);
                shape.setWidth(reverseAction[4]);
                shape.setHeight(reverseAction[5]);
                shape.setRotateAngle(reverseAction[6]);
                shape.setStrokeWidth(reverseAction[7]);
                shape.setBorderColor(reverseAction[8]);
                shape.setFillColor(reverseAction[9]);
                reverseAction[2] = tempX;
                reverseAction[3] = tempY;
                reverseAction[4] = tempWidth;
                reverseAction[5] = tempHeight;
                reverseAction[6] = tempRotateAngle;
                reverseAction[7] = tempStrokeWidth;
                reverseAction[8] = tempStrokeColor;
                reverseAction[9] = tempFillColor;
                break;
        }
        this.currentSession.getRedoStack().push(reverseAction);
        System.out.println(returnString);

        return new ResponseEntity<>(returnString, HttpStatus.OK);
    }

    @GetMapping("redo")
    public ResponseEntity<String> redo() throws CloneNotSupportedException {
        System.out.println("here");
        if(this.currentSession.getRedoStack().empty())
            return new ResponseEntity<>("RedoNull", HttpStatus.OK);

        String returnString = " ";
        String[] reverseUndo = this.currentSession.getRedoStack().pop();
        Shape shape;
        switch (reverseUndo[0]){
            case "create":
                shape = this.currentSession.getShapes().get(Integer.parseInt(reverseUndo[1]));
                returnString = "create " + reverseUndo[1];
                this.restoreShape(reverseUndo[1]);
                reverseUndo[0] = "delete";
                break;

            case "delete":
                shape = this.currentSession.getShapes().get(Integer.parseInt(reverseUndo[1]));
                returnString = "delete " + reverseUndo[1];
                this.reDeleteShape(reverseUndo[1]);
                reverseUndo[0] = "create";
                break;

            case "change":
                shape = this.currentSession.getShapes().get(Integer.parseInt(reverseUndo[1]));
                String tempX = shape.getX();
                String tempY = shape.getY();
                String tempWidth = shape.getWidth();
                String tempHeight = shape.getHeight();
                String tempStrokeWidth = shape.getStrokeWidth();
                String tempRotateAngle = shape.getRotateAngle();
                String tempStrokeColor = shape.getBorderColor();
                String tempFillColor = shape.getFillColor();
                returnString = "change " + reverseUndo[1] + " " + reverseUndo[2] + " " + reverseUndo[3] + " " + reverseUndo[4] + " " + reverseUndo[5] + " " + reverseUndo[6] + " " + reverseUndo[7] + " " + reverseUndo[8] + " " + reverseUndo[9];
                shape.setX(reverseUndo[2]);
                shape.setY(reverseUndo[3]);
                shape.setWidth(reverseUndo[4]);
                shape.setHeight(reverseUndo[5]);
                shape.setRotateAngle(reverseUndo[6]);
                shape.setStrokeWidth(reverseUndo[7]);
                shape.setBorderColor(reverseUndo[8]);
                shape.setFillColor(reverseUndo[9]);
                reverseUndo[2] = tempX;
                reverseUndo[3] = tempY;
                reverseUndo[4] = tempWidth;
                reverseUndo[5] = tempHeight;
                reverseUndo[6] = tempRotateAngle;
                reverseUndo[7] = tempStrokeWidth;
                reverseUndo[8] = tempStrokeColor;
                reverseUndo[9] = tempFillColor;
                this.currentSession.getUndoStack().push(reverseUndo);
                break;
        }
        System.out.println(returnString);
        return new ResponseEntity<>(returnString, HttpStatus.OK);
    }

    @PostMapping("loadJson")
    Object loadJson(@RequestBody String destination) {
        this.currentSession.getUndoStack().clear();
        this.currentSession.getRedoStack().clear();
        return this.currentSession.setShapes(Load.loadJson(destination));
    }

    @PostMapping("saveJson")
    String saveJson(@RequestBody String destination) {
        return Save.saveJson(this.currentSession, destination);
    }

    @PostMapping("loadXml")
    Object loadXml(@RequestBody String destination){
        this.currentSession.getUndoStack().clear();
        this.currentSession.getRedoStack().clear();
        return this.currentSession.setShapes(Load.loadXml(destination));
    }

    @PostMapping("saveXml")
    String saveXml(@RequestBody String destination){
        return Save.saveXml(this.currentSession, destination);
    }

}
