package com.aries.apimng;

import com.aries.extension.starter.PluginController;
import com.aries.extension.util.PropertyUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class APIManagerController extends PluginController {

    @RequestMapping(value = { "/apimanager" }, method = RequestMethod.GET)
    public ModelAndView mainPage(WebRequest request) {
        ModelAndView modelAndView = new ModelAndView();

        ModelMap map = modelAndView.getModelMap();
        map.put("hostName", PropertyUtil.getValue("apimanager", "host_name", "http://127.0.0.1:7900"));
        map.put("apiToken", PropertyUtil.getValue("apimanager", "api_token", ""));

        return modelAndView;
    }
}