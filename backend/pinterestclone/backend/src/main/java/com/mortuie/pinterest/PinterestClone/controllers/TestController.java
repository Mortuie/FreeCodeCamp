package com.mortuie.pinterest.PinterestClone.controllers;

import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "hello world!";
    }


    @GetMapping("/testing")
    public String testing(Principal principal) {
        String name = principal.getName();
        return "memes" + name;
    }

    @GetMapping("/test")
    public Object test(@AuthenticationPrincipal DefaultOAuth2User user) {
        return user;
    }

    @GetMapping("/api/testing")
    public String testing2() {
        return "please help me";
    }
}
