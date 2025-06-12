package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DonationPaymentInfo {
    private Integer id;
    private BigDecimal amount;
    private String address;
}