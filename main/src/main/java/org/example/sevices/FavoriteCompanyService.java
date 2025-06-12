package org.example.sevices;

import lombok.RequiredArgsConstructor;
import org.example.dto.FavoriteCompanyDto;
import org.example.dto.LikesProjection;
import org.example.models.Company;
import org.example.models.FavoriteCampaign;
import org.example.models.FavoriteCompany;
import org.example.models.FavoriteCompanyId;
import org.example.repo.CompanyRepository;
import org.example.repo.FavoriteCompanyRepository;
import org.example.sevices.CompanyService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteCompanyService {

    private final FavoriteCompanyRepository favoriteCompanyRepository;
    private final CompanyRepository companyService;


    public String addToFavorites(Long userId, Long companyId) {
        FavoriteCompanyId id = new FavoriteCompanyId(userId, companyId);
        Company company=companyService.getReferenceById(companyId);
        FavoriteCompany favoriteCompany=new FavoriteCompany(id, company, System.currentTimeMillis());
         favoriteCompanyRepository.save(favoriteCompany);
        return "added";
    }

    public void removeFromFavorites(Long userId, Long companyId) {
        FavoriteCompanyId id = new FavoriteCompanyId(userId, companyId);
        favoriteCompanyRepository.deleteById(id);

    }

    public List<FavoriteCompanyDto> getFavoritesByUser(Long userId) {
        return favoriteCompanyRepository.findAllByIdUserId(userId).stream().map(FavoriteCompanyDto::from).toList();
    }

    public boolean isFavorite(Long userId, Long companyId) {
        return favoriteCompanyRepository.existsById(new FavoriteCompanyId(userId, companyId));
    }
    public Map<Long, Long> getCountLikes() {
        return favoriteCompanyRepository.countLikesForAllCompanies()
                .stream()
                .collect(Collectors.toMap(LikesProjection::getId, LikesProjection::getLikeCount));
    }
}
