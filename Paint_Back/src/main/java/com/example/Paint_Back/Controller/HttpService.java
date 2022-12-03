package com.example.Paint_Back.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(value = "http://localhost:4200")
public class HttpService {

    @GetMapping(value = "/st")
    @ResponseBody
    public String str () {
        return "HELLO!!!";
    }

}
