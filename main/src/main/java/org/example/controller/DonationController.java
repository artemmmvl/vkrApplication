package org.example.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.dto.DonationDto;
import org.example.dto.DonationPaymentInfo;
import org.example.dto.DonationRequest;
import org.example.models.Donation;
import org.example.sevices.DonationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService donationService;

    @PostMapping
    public ResponseEntity<DonationPaymentInfo> donate(@RequestBody @Valid DonationRequest request) {
        return ResponseEntity.ok(donationService.createDonation(request));
    }

    @GetMapping
    public ResponseEntity<List<Donation>> getAll() {
        return ResponseEntity.ok(donationService.getAllDonations());
    }

//    @GetMapping("/campaign/{campaignId}")
//    public ResponseEntity<List<Donation>> getByCampaign(@PathVariable Long campaignId) {
//        return ResponseEntity.ok(donationService.getDonationsByCampaignId(campaignId));
//    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DonationDto>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(donationService.getDonationsByDonorId(userId));
    }
    @GetMapping("/{donationId}/status")
    public ResponseEntity<Map<String,String>> getStatus(@PathVariable Long donationId) {
        String d = donationService.getStatusById(donationId);
        return ResponseEntity.ok(Map.of("status", d));
    }

}
