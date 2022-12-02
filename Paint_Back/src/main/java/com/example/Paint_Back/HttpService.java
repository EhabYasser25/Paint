package com.example.Paint_Back.Controller;

@RestController
public class HttpService {

    @GetMapping(value = "/")
    public String str() {
        return "Hello There!";
    }

}
