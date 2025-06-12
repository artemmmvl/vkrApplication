package org.example.controller;


import lombok.RequiredArgsConstructor;
import org.example.dto.CompanyDto;
import org.example.models.Company;
import org.example.sevices.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping
    public ResponseEntity<List<CompanyDto>> getAllCompanies() {
        return ResponseEntity.ok(companyService.getCompanies());
    }

    @GetMapping("/me")
    public ResponseEntity<List<Company>> getAllCompaniesMe(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(companyService.getCompaniesMe( token));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCompany(@PathVariable Long id) {
        return companyService.getCompany(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createCompany(
            @RequestHeader("Authorization") String token,
            @RequestParam String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String contactEmail,
            @RequestParam(required = false) String website,
            @RequestPart("photo") MultipartFile photo

    ) {
        return ResponseEntity.ok(companyService.setCompany(token, name, description, contactEmail, website, photo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompany(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token,
            @RequestParam String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String contactEmail,
            @RequestParam(required = false) String website
    ) {
        return ResponseEntity.ok(companyService.updateCompany(id, token, name, description, contactEmail, website));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return ResponseEntity.noContent().build();
    }
}
