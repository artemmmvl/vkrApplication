package org.example.dto;

import org.example.models.Campaign;
import org.example.models.FavoriteCampaign;

import java.math.BigDecimal;

public record FavoriteCampaignDto(
        Long campaignId,
        String title,
        String imageUrl,
        BigDecimal goalAmount,
        BigDecimal collectedAmount,
        Long startDate,
        Long endDate
) {
    public static FavoriteCampaignDto from(FavoriteCampaign favorite) {
        Campaign c = favorite.getCampaign();
        return new FavoriteCampaignDto(
                c.getId(),
                c.getTitle(),
                c.getImageUrl(),
                c.getGoalAmount(),
                c.getCollectedAmount(),
                c.getStartDate(),
                c.getEndDate()
        );
    }
}

