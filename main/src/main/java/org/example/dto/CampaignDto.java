package org.example.dto;

import org.example.models.Campaign;
import org.example.models.Status;

import java.math.BigDecimal;

public record CampaignDto(Long id, Long companyId, String title,BigDecimal collectedAmount, BigDecimal goalAmount, String imageUrl,
                          String description,Long startDate, Long endDate, Status status, Long campaignType, Long likeCount) {
    public static CampaignDto from(Campaign campaign, Long likeCount) {
        return new CampaignDto(
                campaign.getId(),
                campaign.getCompanyId().getCompanyId(),
                campaign.getTitle(),
                campaign.getCollectedAmount(),
                campaign.getGoalAmount(),
                campaign.getImageUrl(),
                campaign.getDescription(),
                campaign.getStartDate(),
                campaign.getEndDate(),
                campaign.getStatus(),
                campaign.getCampaignType().getId(),
                likeCount


                );
    }
}
