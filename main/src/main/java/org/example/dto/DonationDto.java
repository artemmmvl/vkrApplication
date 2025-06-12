package org.example.dto;


import lombok.Data;

import java.math.BigDecimal;

@Data
public class DonationDto {
    private Long donationId;
    private BigDecimal amount;
    private String status;
    private String transactionId;
    private Long donationDate;

    private Long campaignId;
    private String campaignTitle;
    private String campaignImageUrl;

    public DonationDto(Integer donationId, BigDecimal amount, String status, String transactionId, Long donationDate,
                       Long campaignId, String campaignTitle, String campaignImageUrl) {
        this.donationId = Long.valueOf(donationId);
        this.amount = amount;
        this.status = status;
        this.transactionId = transactionId;
        this.donationDate = donationDate;
        this.campaignId = campaignId;
        this.campaignTitle = campaignTitle;
        this.campaignImageUrl = campaignImageUrl;
    }

    public static DonationDto from(org.example.models.Donation d) {
        return new DonationDto(
                d.getDonationId(),
                d.getAmount(),
                d.getStatus().toString(),
                d.getTransactionId(),
                d.getDonationDate(),
                d.getCampaign().getId(),
                d.getCampaign().getTitle(),
                d.getCampaign().getImageUrl()
        );
    }
}

