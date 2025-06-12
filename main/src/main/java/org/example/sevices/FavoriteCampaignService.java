package org.example.sevices;

import lombok.RequiredArgsConstructor;
import org.example.dto.LikesProjection;
import org.example.models.Campaign;
import org.example.models.FavoriteCampaign;
import org.example.models.FavoriteCampaignId;
import org.example.repo.CampaignRepository;
import org.example.repo.FavoriteCampaignRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteCampaignService {

    private final FavoriteCampaignRepository favoriteCampaignRepository;
    private final CampaignRepository campaignRepository;


    public List<FavoriteCampaign> getFavoritesByUserId(Long userId) {
        return favoriteCampaignRepository.findAllByIdUserId(userId);
    }

    public FavoriteCampaign addFavorite(Long userId, Long campaignId) {
        FavoriteCampaignId id = new FavoriteCampaignId(userId, campaignId);
        if (favoriteCampaignRepository.existsById(id)) return null;

        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        FavoriteCampaign favorite = new FavoriteCampaign();
        favorite.setId(id);
        favorite.setCampaign(campaign);
        favorite.setAddedAt(System.currentTimeMillis());
        return favoriteCampaignRepository.save(favorite);
    }

    public void removeFavorite(Long userId, Long campaignId) {
        FavoriteCampaignId id = new FavoriteCampaignId(userId, campaignId);
        favoriteCampaignRepository.deleteById(id);
    }

    public boolean isFavorite(Long userId, Long campaignId) {
        return favoriteCampaignRepository.existsById(new FavoriteCampaignId(userId, campaignId));
    }

    public Map<Long, Long> getCountLikes() {
        return favoriteCampaignRepository.countLikesForAllCampaigns()
                .stream()
                .filter(p -> p.getId() != null) // <--- фильтруем!
                .collect(Collectors.toMap(LikesProjection::getId, LikesProjection::getLikeCount));

    }
}
