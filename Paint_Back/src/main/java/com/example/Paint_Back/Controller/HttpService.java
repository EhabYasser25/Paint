package com.example.Paint_Back.Controller;

import com.example.Paint_Back.Model.Load;
import com.example.Paint_Back.Model.Save;
import com.example.Paint_Back.Model.Session;
import com.example.Paint_Back.Model.Shape;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping ("/")
public class HttpService {

    @Autowired
    private Session CurrentSession;
    public HttpService(Session session){this.CurrentSession = session;}

    @PostMapping("create")
    void AddShape (@RequestBody Shape shape) { CurrentSession.AddShape(shape); }

    @PostMapping("load")
    JSONArray load(){ return new Load().LoadShapes();}

    @PostMapping("save")
    void save(){ new Save(CurrentSession);}


}