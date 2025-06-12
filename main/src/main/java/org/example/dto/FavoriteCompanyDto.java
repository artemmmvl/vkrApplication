package org.example.dto;

import org.example.models.Company;
import org.example.models.FavoriteCompany;

public record FavoriteCompanyDto(Long companyId, String name, String logoPath, Long likeCount) {
    public static FavoriteCompanyDto from(FavoriteCompany f) {
        Company c = f.getCompany();
        return new FavoriteCompanyDto(
                c.getCompanyId(),
                c.getName(),
                c.getLogo_path(),
                null // если есть лайки — подставь
        );
    }
}

