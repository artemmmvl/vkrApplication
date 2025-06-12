package org.example.sevices;


import lombok.RequiredArgsConstructor;
import org.example.dto.DonationDto;
import org.example.dto.DonationPaymentInfo;
import org.example.dto.DonationRequest;
import org.example.models.Donation;
import org.example.models.DonationStatus;
import org.example.repo.CampaignRepository;
import org.example.repo.DonationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;
    private final CampaignRepository campaignRepository;


    public DonationPaymentInfo createDonation(DonationRequest request) {
        Donation donation=new Donation();
        donation.setAmount(request.getAmount());
        donation.setStatus(DonationStatus.PENDING);
        donation.setDonorId(request.getDonorId());
        donation.setCampaign(campaignRepository.getReferenceById(request.getCampaignId()));


        Donation donation1= donationRepository.save(donation);
        return new DonationPaymentInfo(donation1.getDonationId(), donation1.getAmount(), donation1.getCampaign().getBlockchainTxId());
    }

    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }


    public List<DonationDto> getDonationsByDonorId(Long donorId) {
        return donationRepository.findAllByDonorId(donorId)
                .stream()
                .map(DonationDto::from)
                .toList();
    }

    public String getStatusById(Long id) {
        return donationRepository.getReferenceById(id).getStatus().toString();

    }
}

