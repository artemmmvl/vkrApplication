package org.example.sevices;

import org.example.dto.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

@Service
public class ETHService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String baseUrl = "http://localhost:8070";
    public String deploy(BigInteger companyId) {
        Map<String, Object> requestBody = Map.of("companyId", companyId);
        ResponseEntity<DeployResponse> response = restTemplate.postForEntity(
                baseUrl + "/deploy",
                requestBody,
                DeployResponse.class
        );
//        System.out.println("Смарт контракт задеплен");
//        System.out.println(response.getBody().address());
        return response.getBody().address();
    }
//    public String donate(String contractAddress, String weiAmount) {
//        DonateRequest request = new DonateRequest(contractAddress, weiAmount);
//        ResponseEntity<Map> response = restTemplate.postForEntity(
//                baseUrl + "/donate",
//                request,
//                Map.class
//        );
//        return (String) response.getBody().get("txHash");
//    }
    public String getBalance(String address) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/balance")
                .queryParam("address", address)
                .toUriString();

        ResponseEntity<BalanceResponse> response = restTemplate.getForEntity(url, BalanceResponse.class);
        return response.getBody().balance();
    }
    public List<DonationEntry> getDonations(String address) {
        System.out.println(address);
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/donations")
                .queryParam("address", address)
                .toUriString();
        ResponseEntity<DonationsResponse> response = restTemplate.getForEntity(url, DonationsResponse.class);
        System.out.println(response);
        return response.getBody().donations();
    }
    public String withdraw(String contractAddress) {
        Map<String, Object> request = Map.of("address", contractAddress);
        ResponseEntity<Map> response = restTemplate.postForEntity(baseUrl + "/withdraw", request, Map.class);
        return (String) response.getBody().get("txHash");
    }
}

