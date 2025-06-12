package org.example.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DonationRequest {
    private Long campaignId;
    private Long donorId;
    private BigDecimal amount;
}