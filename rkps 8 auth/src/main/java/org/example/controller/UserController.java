package org.example.controller;

import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import org.example.controller.dto.AuthenticationRequest;
import org.example.controller.dto.AuthenticationResponse;
import org.example.entity.Role;
import org.example.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;
    private final Gson gson;


    @GetMapping("/users")
    public ResponseEntity<?> getUsers(){
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id){
        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
    }
    @PostMapping("/users/info")
    public ResponseEntity<?> getUserByToken(@RequestBody AuthenticationResponse token){
//        System.out.println(token.getToken());
        return new ResponseEntity<>(userService.getByToken(token.getToken()), HttpStatus.OK);
    }
    @PostMapping("/make-creator")
    public ResponseEntity<?> setCreator(@RequestBody AuthenticationResponse token) {
        System.out.println(token.getToken());

        return new ResponseEntity<>(userService.updateRole(token.getToken(), Role.CREATOR),HttpStatus.OK);
    }
    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ResponseEntity<?> save(
            @RequestParam("firstname") String firstname,
            @RequestParam("lastname") String lastname,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("birthday") Long birthday,
            @RequestParam("gender") String gender,
            @RequestParam("number") String number,
            @RequestPart("photo") MultipartFile photo
    ){
        var authenticationResponse=userService.save(firstname, email, lastname, password, false, birthday, gender, number, photo);

        return new ResponseEntity<>(authenticationResponse, HttpStatus.CREATED);

    }
    @PostMapping("/auth")
    public ResponseEntity<AuthenticationResponse> auth(@RequestBody AuthenticationRequest request){
        System.out.println(request.getEmail());
        System.out.println(request.getPassword());
        return new ResponseEntity<>(userService.auth(request.getEmail(), request.getPassword()), HttpStatus.OK);
    }
    @DeleteMapping("/users")
    public ResponseEntity<?> delete(Long id){
        userService.delete(id);
        return new ResponseEntity<>( HttpStatus.NO_CONTENT);
    }

}
