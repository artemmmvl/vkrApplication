package org.example.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;

@Service
public class JwtService {
    @Value("${application.security.jwt.secret-key}")
    private String SECRET_KEY;
    private Claims extractAllClaims(String token){
        try {
            return Jwts
                    .parser()
                    .setSigningKey(getSignInkey()).
                    parseClaimsJws(token).
                    getBody();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    private Key getSignInkey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public String getRole(String token) {
//        System.out.println(token);
        Claims claims=extractAllClaims(token);
        if(claims!=null){
            System.out.println(claims);
            return claims.get("role", String.class);
        }
        else {
            return null;
        }

    }
    public Long getUserID(String token) {
//        System.out.println(token);
        Claims claims=extractAllClaims(token);
        if(claims!=null){
            System.out.println(claims);
            return claims.get("id", Long.class);
        }
        else {
            return null;
        }

    }
}
