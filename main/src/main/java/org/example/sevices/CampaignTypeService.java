package org.example.services;

import lombok.RequiredArgsConstructor;
import org.example.models.CampaignType;
import org.example.repo.CampaignTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CampaignTypeService {

    private final CampaignTypeRepository campaignTypeRepository;

    public CampaignType createCampaignType(CampaignType campaignType) {
        return campaignTypeRepository.save(campaignType);
    }

    public List<CampaignType> getAllCampaignTypes() {
        return campaignTypeRepository.findAll();
    }

    public Optional<CampaignType> getCampaignTypeById(Long id) {
        return campaignTypeRepository.findById(id);
    }

    public CampaignType updateCampaignType(Long id, CampaignType updatedData) {
        return campaignTypeRepository.findById(id).map(existing -> {
            existing.setName(updatedData.getName());
            return campaignTypeRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Тип кампании не найден"));
    }

    public void deleteCampaignType(Long id) {
        campaignTypeRepository.deleteById(id);
    }
}
