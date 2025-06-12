package org.example.config;

import com.google.gson.GsonBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Gson {
    @Bean
    public com.google.gson.Gson getGson(){
        return new com.google.gson.Gson();
    }
}
