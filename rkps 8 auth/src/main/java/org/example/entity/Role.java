package org.example.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    DONATER, CREATOR, ADMINISTRATOR;

    @Override
    public String getAuthority() {
        return name();
    }
}
