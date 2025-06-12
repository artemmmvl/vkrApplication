package org.example.controller;

import lombok.RequiredArgsConstructor;
import org.example.dto.FavoriteCompanyDto;
import org.example.models.FavoriteCompany;
import org.example.sevices.FavoriteCompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorite-companies")
@RequiredArgsConstructor
public class FavoriteCompanyController {

    private final FavoriteCompanyService favoriteCompanyService;

    @PostMapping("/{userId}/{companyId}")
    public ResponseEntity<String> addToFavorites(@PathVariable Long userId, @PathVariable Long companyId) {
        return ResponseEntity.ok(favoriteCompanyService.addToFavorites(userId, companyId));
    }

    @DeleteMapping("/{userId}/{companyId}")
    public ResponseEntity<Void> removeFromFavorites(@PathVariable Long userId, @PathVariable Long companyId) {
        favoriteCompanyService.removeFromFavorites(userId, companyId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<FavoriteCompanyDto>> getFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteCompanyService.getFavoritesByUser(userId));
    }

    @GetMapping("/{userId}/{companyId}/check")
    public ResponseEntity<Boolean> isFavorite(@PathVariable Long userId, @PathVariable Long companyId) {
        return ResponseEntity.ok(favoriteCompanyService.isFavorite(userId, companyId));
    }
}
