package org.example.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.Objects;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Сущность компании")
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private Long companyId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "updated_at")
    private Long updatedAt;
    @Column(name = "logo_path")
    private String logo_path;
    @Column(name = "website")
    private String website;


    @Column(name = "created_at")
    private Long createdAt;


    @Override
    public String toString() {
        return companyId != null ? companyId.toString() : "null";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Company company)) return false;
        return Objects.equals(companyId, company.companyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(companyId);
    }
}
