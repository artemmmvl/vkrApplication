package org.example.controller.dto;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j

public class Cont {
    @GetMapping("/")
    @PreAuthorize("")
    public ResponseEntity<?> getHome(){
        log.info("test log info");
        log.error("test log error");

        return new ResponseEntity<>("Hello!", HttpStatus.OK);
    }
    @GetMapping("/kill")
    public ResponseEntity<?> getHome1(){
        log.info("kill");
        System.exit(1);
        throw new RuntimeException("Принудительное завершение приложения.");

//        return new ResponseEntity<>("Hello!", HttpStatus.OK);
    }
}
