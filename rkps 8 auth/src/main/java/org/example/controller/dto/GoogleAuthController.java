package org.example.controller.dto;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.example.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import java.util.Enumeration;
import java.util.Map;

@Controller
@AllArgsConstructor
public class GoogleAuthController {
    private final UserService userService;

//    @GetMapping("/google/register")
//    public ResponseEntity<?> getUserInfo() {
//        // Получаем текущую аутентификацию
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        if (authentication instanceof OAuth2AuthenticationToken) {
//            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
//
//            // Извлекаем данные пользователя
//            Map<String, Object> attributes = oauthToken.getPrincipal().getAttributes();
//            String email = (String) attributes.get("email");
//            String firstname = (String) attributes.get("given_name");
//            String lastname = (String) attributes.get("family_name");
//
//
//            // Логируем данные
//            System.out.println("Email: " + email);
//            System.out.println("given_name: " + firstname);
//            System.out.println("family_name: " + lastname);
//
//
//            // Возвращаем данные клиенту
//            return new ResponseEntity<>(userService.save(firstname,email,lastname,null, true), HttpStatus.OK);
//        }
//
//        return ResponseEntity.badRequest().body("User is not authenticated through Google");
//    }
    @GetMapping("/google/auth")
    public ResponseEntity<?> login() {
        // Получаем текущую аутентификацию
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;

            // Извлекаем данные пользователя
            Map<String, Object> attributes = oauthToken.getPrincipal().getAttributes();
            String email = (String) attributes.get("email");
            String firstname = (String) attributes.get("given_name");
            String lastname = (String) attributes.get("family_name");





            // Возвращаем данные клиенту
            return new ResponseEntity<>(userService.authGoogle(email, firstname, lastname), HttpStatus.OK);
        }

        return ResponseEntity.badRequest().body("User is not authenticated through Google");
    }

    @GetMapping("/google-login")
    public String redirectToGoogleLogin() {
        return "redirect:/oauth2/authorization/google?state=login";
    }
}
