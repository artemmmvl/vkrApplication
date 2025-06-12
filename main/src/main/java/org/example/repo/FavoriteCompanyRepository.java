package org.example.repo;

import org.example.dto.LikesProjection;
import org.example.models.FavoriteCompany;
import org.example.models.FavoriteCompanyId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteCompanyRepository extends JpaRepository<FavoriteCompany, FavoriteCompanyId> {
    List<FavoriteCompany> findAllByIdUserId(Long userId);

    @Query(value = """
        SELECT company_id AS ID, COUNT(user_id) AS likeCount
        FROM favorite_companies
        GROUP BY company_id
        ORDER BY company_id ASC
    """, nativeQuery = true)
    List<LikesProjection> countLikesForAllCompanies();


}
