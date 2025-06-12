package org.example.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "campaigns")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Schema(description = "Сущность кампании по сбору средств")
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "campaign_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    @JsonIgnore

    private Company companyId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "goal_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal goalAmount;

    @Column(name = "collected_amount", precision = 15, scale = 2)
    private BigDecimal collectedAmount = BigDecimal.ZERO;

    @Column(name = "start_date", nullable = false)
    private Long startDate;

    @Column(name = "end_date", nullable = false)
    private Long endDate;

    @Column
    @Enumerated(EnumType.STRING)
    private Status status=Status.ACTIVE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_type", referencedColumnName = "id")
    private CampaignType campaignType;

    @Column(name = "image_url")
    private String imageUrl;

    @Override
    public String toString() {
        return "Campaign{" +
                "id=" + id +
                ", companyId=" + companyId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", goalAmount=" + goalAmount +
                ", collectedAmount=" + collectedAmount +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", status=" + status +
                ", campaignType=" + campaignType +
                ", imageUrl='" + imageUrl + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", blockchainTxId='" + blockchainTxId + '\'' +
                '}';
    }

    @Column(name = "created_at")
    private Long createdAt=System.currentTimeMillis();

    @Column(name = "updated_at")
    private Long updatedAt;

    @Column(name = "blockchain_tx_id")
    private String blockchainTxId;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Campaign that)) return false;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
