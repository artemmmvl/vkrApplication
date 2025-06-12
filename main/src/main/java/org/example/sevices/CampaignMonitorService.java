package org.example.sevices;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.DonationEntry;
import org.example.models.Campaign;
import org.example.models.Donation;
import org.example.models.DonationStatus;
import org.example.repo.CampaignRepository;
import org.example.repo.DonationRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CampaignMonitorService {

    private final CampaignRepository campaignRepository;
    private final DonationRepository donationRepository;

    private final ETHService ethService;

    private final String nodeApiUrl = "http://localhost:8070/balance";

    @Transactional
    @Scheduled(fixedRate = 5 * 60 * 1000) // каждые 5 минут
    public void checkDonation() {
        log.info("🔍 Старт проверки заявок кампаний...");

        List<Donation> donations = donationRepository.findAll();

        for (Donation don : donations) {
            try {
                System.out.println(don.getDonationId());
                System.out.println(don.getStatus());
                if(don.getStatus().toString().equals("PENDING")){
                    System.out.println(don.getAmount());
                    System.out.println("adress"+don.getCampaign().getBlockchainTxId());
                    List<DonationEntry> listDon=ethService.getDonations(don.getCampaign().getBlockchainTxId());
                    boolean isMatched = listDon.stream().anyMatch(entry -> {
                        // Преобразуем BigInteger (в wei) в ETH
                        BigDecimal ethAmount = new BigDecimal(entry.amount()).divide(BigDecimal.TEN.pow(18));
                        return ethAmount.compareTo(don.getAmount()) == 0;
                    });
                    if (isMatched) {
                        don.setStatus(DonationStatus.COMPLETED);
                        donationRepository.save(don);
                        log.info("✅ Донат {} подтверждён!", don.getDonationId());
                    }

                }



            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

    @Scheduled(fixedRate = 5 * 60 * 1000) // каждые 5 минут
    public void checkCampaignBalances() {
        log.info("🔍 Старт проверки балансов кампаний...");

        List<Campaign> campaigns = campaignRepository.findAll();

        for (Campaign campaign : campaigns) {
            try {
                String balance=ethService.getBalance(campaign.getBlockchainTxId());

                if(!campaign.getCollectedAmount().equals(new BigDecimal(balance))){
                    System.out.println();
                    campaign.setCollectedAmount(new BigDecimal(balance));
                    campaignRepository.save(campaign);

                }

            } catch (Exception e) {
                log.error("❌ Ошибка при проверке {}: {}", campaign.getBlockchainTxId(), e.getMessage());
            }
        }
    }

    private BigDecimal toEth(String weiStr) {
        return new BigDecimal(weiStr).divide(new BigDecimal("1000000000000000000"), 18, RoundingMode.DOWN);
    }

    public record BalanceResponse(String balance) {}
}
