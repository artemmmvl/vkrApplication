package org.example.repo;

import org.example.models.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    @Query("SELECT c FROM Campaign c WHERE c.companyId.userId = :userId")
    List<Campaign> findAllByUserId(@Param("userId") Long userId);

}
