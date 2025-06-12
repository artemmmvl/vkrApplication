package org.example.dto;


import org.example.models.Company;

public record CompanyDto(
        Long companyId,
        Long userId,
        String name,
        String description,
        String contactEmail,
        String logoPath,
        String website,
        Long likeCount
) {
    public static CompanyDto from(Company company, Long likeCount) {
        return new CompanyDto(
                company.getCompanyId(),
                company.getUserId(),
                company.getName(),
                company.getDescription(),
                company.getContactEmail(),
                company.getLogo_path(),
                company.getWebsite(),
                likeCount
        );
    }
}
