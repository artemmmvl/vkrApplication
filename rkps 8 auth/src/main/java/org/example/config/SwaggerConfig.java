package org.example.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                title = " Api",
                description = "Api", version = "1.0.0",
                contact = @Contact(
                        name = "Vlastyuk Artem",
                        email = "cvlastyuk@mail.ru",
                        url = "https://localhost:8081/api"
                )
        )
)
public class SwaggerConfig {
}