package com.example.oasis.controller.router;

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

    @RequestMapping(value = "/fieldList")
    public String getFieldList() {
        return "fieldList";
    }

    @RequestMapping(value = "/fieldDetail")
    public String getFieldDetail() {
        return "fieldDetail";
    }

    @RequestMapping(value = "/paperList")
    public String getPaperList() {
        return "paperList";
    }

    @RequestMapping(value = "/affiliationList")
    public String getAffiliationList() {
        return "affiliationList";
    }

}
