package org.example.controller;


import lombok.RequiredArgsConstructor;
import org.example.dto.FavoriteCampaignDto;
import org.example.models.FavoriteCampaign;
import org.example.sevices.FavoriteCampaignService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorite-campaigns")
@RequiredArgsConstructor
public class FavoriteCampaignController {

    private final FavoriteCampaignService favoriteCampaignService;

    @PostMapping("/{userId}/{campaignId}")
    public ResponseEntity<String> addToFavorites(@PathVariable Long userId, @PathVariable Long campaignId) {
        favoriteCampaignService.addFavorite(userId, campaignId);
        return ResponseEntity.status(201).body("created");
    }

    @DeleteMapping("/{userId}/{campaignId}")
    public ResponseEntity<Void> removeFromFavorites(@PathVariable Long userId, @PathVariable Long campaignId) {
        favoriteCampaignService.removeFavorite(userId, campaignId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<FavoriteCampaignDto>> getFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteCampaignService.getFavoritesByUserId(userId)
                .stream()
                .map(FavoriteCampaignDto::from)
                .toList());
    }


    @GetMapping("/{userId}/{campaignId}/check")
    public ResponseEntity<Boolean> isFavorite(@PathVariable Long userId, @PathVariable Long campaignId) {
        return ResponseEntity.ok(favoriteCampaignService.isFavorite(userId, campaignId));
    }
}
