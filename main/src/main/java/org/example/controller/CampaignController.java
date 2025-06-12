package org.example.controller;

import lombok.RequiredArgsConstructor;
import org.example.models.Campaign;
import org.example.dto.CampaignDto;
import org.example.sevices.CampaignService;
import org.example.sevices.ETHService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
public class CampaignController {

    private final CampaignService campaignService;
    private final ETHService ethService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> createCampaign(
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("goalAmount") BigDecimal goalAmount,
            @RequestParam("startDate") Long startDate,
            @RequestParam("endDate") Long endDate,
            @RequestParam("companyId") Long companyId,
            @RequestParam("campaignType") Long campaignTypeId,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {

        return ResponseEntity.ok(campaignService.createCampaign(
                title, description, goalAmount, startDate, endDate,
                companyId, campaignTypeId, image
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampaignDto> getCampaignById(@PathVariable Long id) {
        return ResponseEntity.ok(campaignService.getCampaignById(id));
    }
    @GetMapping("/me")
    public ResponseEntity<?> getCampaignMe(@RequestHeader("Authorization") String token) {
        List<CampaignDto> campaigns = campaignService.getCampaignMe(token);
        return ResponseEntity.ok(campaigns);
    }
//    @GetMapping("/test")
//    public String test(){
//        String address = ethService.deploy(BigInteger.valueOf(2));
//        ethService.donate(address, "0.5"); // 0.01 ETH
//        String balance = ethService.getBalance(address);
//        List<DonationEntry> donations = ethService.getDonations(address);
//        String tx = ethService.withdraw(address);
//
//        System.out.println("💬 Адрес: " + address);
//        System.out.println("💰 Баланс: " + balance);
//        System.out.println("📄 Донаты: " + donations);
//        System.out.println("🏦 Вывод: " + tx);
//        return "m";
//    }
    @GetMapping
    public ResponseEntity<List<CampaignDto>> getAllCampaigns() {
        return ResponseEntity.ok(campaignService.getAllCampaigns());
    }



    @PutMapping("/{id}")
    public ResponseEntity<?> updateCampaign(@PathVariable Long id, @RequestBody Campaign updatedCampaign) {
        try {
            return ResponseEntity.ok(campaignService.updateCampaign(id, updatedCampaign));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable Long id) {
        campaignService.deleteCampaign(id);
        return ResponseEntity.noContent().build();
    }
}
