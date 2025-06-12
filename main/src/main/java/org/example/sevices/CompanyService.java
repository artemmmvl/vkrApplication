package org.example.sevices;

import org.example.config.JwtService;
import org.example.dto.CampaignDto;
import org.example.dto.CompanyDto;
import org.example.models.Company;
import org.example.dto.ErrorResponse;
import org.example.repo.CompanyRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class CompanyService {
    @Value("${upload-directory}")
    private String UPLOAD_DIRECTORY;

    private final CompanyRepository companyRepository;
    private final FavoriteCompanyService favoriteCompanyService;

    private final JwtService jwtService;

    public CompanyService(CompanyRepository companyRepository, JwtService jwtService, FavoriteCompanyService favoriteCompanyService) {
        this.companyRepository = companyRepository;
        this.jwtService = jwtService;
        this.favoriteCompanyService=favoriteCompanyService;
    }

    public List<CompanyDto> getCompanies(){
        Map<Long, Long> likesMap=favoriteCompanyService.getCountLikes();
        return companyRepository.findAll().stream()
                .map(company-> CompanyDto.from(company, likesMap.get(company.getCompanyId())))
                .toList();
    }
    public List<Company> getCompaniesMe(String token){

        return companyRepository.findAllByUserId(jwtService.getUserID(token.substring(7)));
    }

    public Optional<Company> getCompany(Long id) {
        return companyRepository.findById(id);
    }
    public Object setCompany(String token, String name, String description, String contactEmail, String website, MultipartFile photo){
//        Double userID=jwtService.;

//        order.setUserId(userId);
//        try {
//            userID= (Long) ((Map<?, ?>)userClient.getUserByToken(token.substring(7)).getBody()).get("id");
//
//        }
//        catch (Exception e){
//            System.out.println(e.getMessage());
//            e.printStackTrace();
//            return Message.builder().message("Ошибка при получении пользователя").build();
//
//        }
        Company company=new Company();
        company.setName(name);
        company.setDescription(description);
        company.setContactEmail(contactEmail);
        company.setWebsite(website);
        if (photo != null && !photo.isEmpty()) {
            try {
                String fileName =  UUID.randomUUID().toString() + "." +  photo.getOriginalFilename();

                File saveFile = new File(UPLOAD_DIRECTORY+"companies/"+fileName);
                photo.transferTo(saveFile);

                // Например, сохранить путь в БД
                company.setLogo_path("/companies/" + fileName);
            } catch (IOException e) {
                e.printStackTrace();
                return ErrorResponse.builder().message("Ошибка при сохранении фото").build();
            }
        }
        company.setUserId(jwtService.getUserID(token.substring(7)));
        company.setCreatedAt(System.currentTimeMillis());


        return companyRepository.save(company);
    }
    public Object updateCompany(Long id, String token, String name, String description, String contactEmail, String website){
        Double userID;

//        order.setUserId(userId);
//        try {
//            userID= (Double) ((Map<?, ?>)userClient.getUserByToken(token.substring(7)).getBody()).get("id");
//
//        }
//        catch (Exception e){
//            System.out.println(e.getMessage());
////            return Message.builder().message("Ошибка при получении пользователя").build();
//
//        }
        Company company =companyRepository.getReferenceById(id);
        company.setName(name);
        company.setDescription(description);
        company.setContactEmail(contactEmail);
        company.setWebsite(website);
        company.setUserId(1L);
        company.setCreatedAt(System.currentTimeMillis());


        return companyRepository.save(company);
    }
    public void deleteCompany(Long id){

         companyRepository.deleteById(id);
    }


}
