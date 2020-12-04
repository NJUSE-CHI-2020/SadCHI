package com.example.oasisdemo.controller.router;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author zjy
 * @date 2020/3/4
 */
@Controller
public class ViewController {

    @RequestMapping(value = "/index")
    public String getIndex() {
        return "index";
    }

    @RequestMapping(value = "/rank")
    public String getBrowse() {
        return "rank";
    }

}
