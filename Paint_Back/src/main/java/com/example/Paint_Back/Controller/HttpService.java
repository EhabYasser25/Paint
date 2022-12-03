package com.example.Paint_Back.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HttpService {

    @GetMapping(value = "/")
    public String str () {
        return "HELLO!!!";
    }

}
