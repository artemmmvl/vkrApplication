package org.example.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "donations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_id")
    private Integer donationId;

    @Column(name = "amount", nullable = false, precision = 24, scale = 8)
    private BigDecimal amount;

    @Column(name = "transaction_id", unique = true, length = 255)
    private String transactionId;

    @Column(name = "donation_date")
    private Long donationDate = System.currentTimeMillis();

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 50, nullable = false)
    private DonationStatus status = DonationStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    @Column(name = "donor_id")
    private Long donorId;
}

