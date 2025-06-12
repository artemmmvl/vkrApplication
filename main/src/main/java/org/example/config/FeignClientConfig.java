//package org.example.config;
//
//import feign.RequestInterceptor;
//import feign.RequestTemplate;
//import lombok.AllArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class FeignClientConfig {
//    @Value("${application.security.jwt.token}")
//    private  String token;
//    @Bean
//    public RequestInterceptor requestInterceptor() {
//        return new RequestInterceptor() {
//            @Override
//            public void apply(RequestTemplate requestTemplate) {
//                requestTemplate.header("Authorization", "Bearer " + token);
//            }
//        };
//    }
//
//
//
//}
