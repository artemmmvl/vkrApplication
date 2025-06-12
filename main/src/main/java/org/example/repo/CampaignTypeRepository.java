package org.example.repo;

import org.example.models.CampaignType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampaignTypeRepository extends JpaRepository<CampaignType, Long> {

}
