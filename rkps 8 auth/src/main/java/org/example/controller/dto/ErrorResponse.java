package org.example.controller.dto;

import lombok.Builder;
import lombok.Data;

@Builder

public class ErrorResponse {
    String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
