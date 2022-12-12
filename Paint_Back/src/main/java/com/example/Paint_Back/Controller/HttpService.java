package com.example.Paint_Back.Controller;

import com.example.Paint_Back.Model.Load;
import com.example.Paint_Back.Model.Save;
import com.example.Paint_Back.Model.Session;
import com.example.Paint_Back.Model.Shape;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping ("/")
public class HttpService {

    int counter = 0;
    @Autowired
    private Session CurrenSession;
    public HttpService(Session session){this.CurrenSession = session;}

    private JSONArray List = new JSONArray();
    public JSONArray getList() {return List;}

    @PostMapping("create")
    void AddShape (@RequestBody Shape shape) {
        counter++;
        JSONObject obj = new JSONObject();
        obj.put("name",shape.getName());
        obj.put("id",shape.getId());
        obj.put("x",shape.getX());
        obj.put("y",shape.getY());
        obj.put("width",shape.getWidth());
        obj.put("height",shape.getHeight());
        obj.put("rotateAngle",shape.getRotateAngle());
        obj.put("strokeWidth",shape.getStrokeWidth());
        obj.put("borderColor",shape.getBorderColor());
        obj.put("fillColor",shape.getFillColor());

        JSONObject obj2 = new JSONObject();
        obj2.put("shape",obj);
        if( shape.getId().equals("0") ) List.clear();
        List.add(obj2);
    }

    @PostMapping("load")
    JSONArray load(){ return new Load().LoadShapes();}

    @PostMapping("save")
    void save(){ new Save(this);}


}
