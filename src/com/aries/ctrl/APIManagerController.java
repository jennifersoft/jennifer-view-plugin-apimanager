package com.aries.ctrl;

import com.aries.view.service.DomainService;
import com.aries.view.service.mng.AgentService;
import com.aries.view.service.mng.BusinessService;
import com.aries.view.service.perf.TextDataService;
import com.aries.view.service.perf.XViewService;
import com.aries.view.web.BaseController;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = { "/plugin" })
public class APIManagerController {
    @Autowired
    TextDataService textDataService;
    @Autowired
    XViewService xviewService;
    @Autowired
    DomainService domainService;
    @Autowired
    AgentService agentService;
    @Autowired
    BusinessService businessService;

    @RequestMapping(value = { "/apimanager" }, method = RequestMethod.GET)
    public ModelAndView mainPage(WebRequest request) throws JSONException
    {
        ModelAndView modelAndView = new ModelAndView();
        ModelMap map = modelAndView.getModelMap();

        return modelAndView;
    }
}