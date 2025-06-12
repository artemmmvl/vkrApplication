package org.example.models;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "favorite_campaigns")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteCampaign {

    @EmbeddedId
    private FavoriteCampaignId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("campaignId")
    @JoinColumn(name = "campaign_id", referencedColumnName = "campaign_id")
    private Campaign campaign;

    @Column(name = "added_at")
    private Long addedAt;


}

