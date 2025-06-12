package org.example.service;

import org.example.config.JwtService;
import org.example.controller.dto.AuthenticationResponse;
import org.example.controller.dto.ErrorResponse;
import org.example.entity.Gender;
import org.example.entity.Role;
import org.example.entity.User;
import org.example.repo.UserRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
//@AllArgsConstructor
public class UserService  {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Value("${upload-directory}")
    private String UPLOAD_DIRECTORY;



    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public List<User> findAll(){
        return userRepo.findAll();
    }
    public User findUserById(Long id){
        return userRepo.findById(id).get();
    }
    public void delete(Long id){
        userRepo.deleteById(id);
    }
    public AuthenticationResponse auth(String email, String password){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        password
                )
        );
        var user=userRepo.findUserByEmail(email);
        var jwtToken=jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();

    }

    public Object save(String firstname, String email, String lastname, String password, boolean isGoogleUser, Long birthday, String gender, String number, MultipartFile photo) {
        if(userRepo.findUserByEmail(email)!=null){
            return ErrorResponse.builder().message("Пользователь уже существует").build();
        }
        User user=new User();
        user.setEmail(email);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setPassword(password!=null?passwordEncoder.encode(password):null);
        user.setRoles(List.of(Role.DONATER));
        user.setCreatedAt(System.currentTimeMillis()/1000L);
        user.setUpdatedAt(System.currentTimeMillis()/1000L);
        user.setNumber(number);
        user.setIsBlocked(false);
        user.setGender(Objects.equals(gender, "man") ?Gender.MALE:Gender.FEMALE);

        user.setBirthDate(birthday);


        user.setIsGoogleUser(isGoogleUser);
        List<User> users=findAll();

        if (photo != null && !photo.isEmpty()) {
            try {
                String fileName =  UUID.randomUUID().toString() + "." +  photo.getOriginalFilename();

                File saveFile = new File(UPLOAD_DIRECTORY+"profile/"+fileName);
                photo.transferTo(saveFile);

                // Например, сохранить путь в БД
                user.setPhoto("/profile/" + fileName);
            } catch (IOException e) {
                e.printStackTrace();
                return ErrorResponse.builder().message("Ошибка при сохранении фото").build();
            }
        }
        userRepo.save(user);
        var jwtToken= jwtService.generateToken(user);
        return AuthenticationResponse.builder().
                token(jwtToken).
                build();
    }

//    public AuthenticationResponse setSeller(String username) {
//        User user=userRepo.findUserByEmail(username);
//        user.setRole(Role.SELLER);
//        userRepo.save(user);
//        var jwtToken= jwtService.generateToken(user);
//
//        return AuthenticationResponse.builder().token(jwtToken).build();
//    }
//
    public Object authGoogle(String email, String firstname, String lastname) {
        var user=userRepo.findUserByEmail(email);
        if(user==null){
//            return save(firstname, email, lastname, null, true,);
            return null;
        }
        if(user.getIsGoogleUser()){
            var jwtToken=jwtService.generateToken(user);
            return AuthenticationResponse.builder().token(jwtToken).build();
        }
        else {
            return ErrorResponse.builder().message("Пользователь с такой почтой уже существует").build();
        }

    }

    public Object getByToken(String token) {
        String username=jwtService.extractUserName(token);
        return userRepo.findUserByEmail(username);

    }

    public Object updateRole(String token, Role role) {
        User user= (User) getByToken(token);
        System.out.println(user);
        user.setRoles(new ArrayList<>(List.of(role)));
        userRepo.save(user);
        var jwtToken= jwtService.generateToken(user);
        return AuthenticationResponse.builder().
                token(jwtToken).
                build();
    }
}
