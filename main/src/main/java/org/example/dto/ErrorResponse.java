package org.example.dto;

import lombok.Builder;

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
