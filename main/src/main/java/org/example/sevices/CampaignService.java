package org.example.sevices;

import org.example.config.JwtService;
import org.example.dto.CampaignDto;
import org.example.dto.ErrorResponse;
import org.example.models.*;
import org.example.repo.CampaignRepository;
import org.example.repo.CampaignTypeRepository;
import org.example.repo.CompanyRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class CampaignService {
    @Value("${upload-directory}")
    private String UPLOAD_DIRECTORY;



    private final CampaignRepository campaignRepository;
    private final CompanyRepository companyRepository;
    private final CampaignTypeRepository campaignTypeRepository;

    private final FavoriteCampaignService favoriteCampaignService;
    private final JwtService jwtService;
    private final ETHService ethService;

    public CampaignService(CampaignRepository campaignRepository, CompanyRepository companyRepository, CampaignTypeRepository campaignTypeRepository, JwtService jwtService, ETHService ethService, FavoriteCampaignService favoriteCampaignService) {
        this.campaignRepository = campaignRepository;
        this.companyRepository = companyRepository;
        this.campaignTypeRepository = campaignTypeRepository;
        this.jwtService = jwtService;
        this.ethService = ethService;
        this.favoriteCampaignService = favoriteCampaignService;

    }

    public Object createCampaign(String title, String description, BigDecimal goalAmount, Long startDate, Long endDate,
                                 Long companyId,
                                 Long campaignTypeId, MultipartFile image) {
        Campaign campaign = new Campaign();

        campaign.setTitle(title);
        campaign.setDescription(description);
        campaign.setGoalAmount(goalAmount);
        campaign.setStartDate(startDate);
        campaign.setStatus(Status.ACTIVE);
        campaign.setEndDate(endDate);
        System.out.println(companyId);
        // Привязка компании
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Компания не найдена: id = " + companyId));
        System.out.println(company.getName());
        campaign.setCompanyId(company);

        // Привязка типа кампании
        CampaignType type = campaignTypeRepository.findById(campaignTypeId)
                .orElseThrow(() -> new RuntimeException("Тип кампании не найден: id = " + campaignTypeId));
        campaign.setCampaignType(type);

        if (image != null && !image.isEmpty()) {
            try {
                String fileName =  UUID.randomUUID().toString() + "." +  image.getOriginalFilename();

                File saveFile = new File(UPLOAD_DIRECTORY+"campaigns/"+fileName);
                image.transferTo(saveFile);

                // Например, сохранить путь в БД
                campaign.setImageUrl("/campaigns/" + fileName);
            } catch (IOException e) {
                e.printStackTrace();
                return ErrorResponse.builder().message("Ошибка при сохранении фото").build();
            }
        }
        System.out.println(campaign);
        Campaign campaignSave=campaignRepository.save(campaign);
        String blockid=ethService.deploy(BigInteger.valueOf(campaignSave.getId()));
        campaign.setBlockchainTxId(blockid);
        return campaignRepository.save(campaign);
    }

    public CampaignDto getCampaignById(Long id) {
        Campaign campaign=campaignRepository.getReferenceById(id);
        Map<Long, Long> likesMap=favoriteCampaignService.getCountLikes();

        return CampaignDto.from(campaign, likesMap.get(campaign.getId()));
    }
    public List<CampaignDto> getCampaignMe(String token) {
//        return campaignRepository.findAllByUserId();
        Map<Long, Long> likesMap=favoriteCampaignService.getCountLikes();

        return campaignRepository.findAllByUserId(jwtService.getUserID(token.substring(7)))
                .stream()
                .map(campaign->CampaignDto.from(campaign, likesMap.get(campaign.getId())))
                .toList();

    }


    public List<CampaignDto> getAllCampaigns() {
        Map<Long, Long> likesMap=favoriteCampaignService.getCountLikes();
        return campaignRepository.findAll().stream()
                .map(campaign->CampaignDto.from(campaign, likesMap.get(campaign.getId())))
                .toList();
    }

    public Campaign updateCampaign(Long id, Campaign updatedData) {
        return campaignRepository.findById(id).map(existing -> {
            existing.setTitle(updatedData.getTitle());
            existing.setDescription(updatedData.getDescription());
            existing.setGoalAmount(updatedData.getGoalAmount());
            existing.setStartDate(updatedData.getStartDate());
            existing.setEndDate(updatedData.getEndDate());
            existing.setStatus(updatedData.getStatus());
            existing.setCampaignType(updatedData.getCampaignType());
            existing.setUpdatedAt(System.currentTimeMillis());
            return campaignRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Кампания не найдена"));
    }

    public void deleteCampaign(Long id) {
        campaignRepository.deleteById(id);
    }

//    public List<Campaign> getCampaignsByCompanyId(Long companyId) {
//        return campaignRepository.findByCompanyId(companyId);
//    }
}
