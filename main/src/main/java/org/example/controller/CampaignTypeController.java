package org.example.controller;

import lombok.RequiredArgsConstructor;
import org.example.models.CampaignType;
import org.example.services.CampaignTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaign-types")
@RequiredArgsConstructor
public class CampaignTypeController {

    private final CampaignTypeService campaignTypeService;

    @PostMapping
    public ResponseEntity<CampaignType> createCampaignType(@RequestBody CampaignType campaignType) {
        return ResponseEntity.ok(campaignTypeService.createCampaignType(campaignType));
    }

    @GetMapping
    public ResponseEntity<List<CampaignType>> getAllCampaignTypes() {
        return ResponseEntity.ok(campaignTypeService.getAllCampaignTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCampaignTypeById(@PathVariable Long id) {
        return campaignTypeService.getCampaignTypeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCampaignType(@PathVariable Long id, @RequestBody CampaignType updatedData) {
        try {
            return ResponseEntity.ok(campaignTypeService.updateCampaignType(id, updatedData));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaignType(@PathVariable Long id) {
        campaignTypeService.deleteCampaignType(id);
        return ResponseEntity.noContent().build();
    }
}
