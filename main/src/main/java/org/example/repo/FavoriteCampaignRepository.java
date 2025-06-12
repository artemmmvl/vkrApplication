package org.example.repo;

import org.example.dto.LikesProjection;
import org.example.models.FavoriteCampaign;
import org.example.models.FavoriteCampaignId;
import org.example.models.FavoriteCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteCampaignRepository extends JpaRepository<FavoriteCampaign, FavoriteCampaignId> {
    List<FavoriteCampaign> findAllByIdUserId(Long userId);

    @Query(value = """
        SELECT campaign_id AS ID, COUNT(user_id) AS likeCount
        FROM favorite_campaigns
        GROUP BY campaign_id
        ORDER BY campaign_id ASC
    """, nativeQuery = true)
    List<LikesProjection> countLikesForAllCampaigns();

}
