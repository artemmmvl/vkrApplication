package org.example.repo;

import org.example.models.Company;
import org.example.models.Company;
import org.example.models.FavoriteCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company,Long> {
    List<Company> findAllByUserId(Long userId);

}
