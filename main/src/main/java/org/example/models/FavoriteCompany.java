package org.example.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "favorite_companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteCompany {

    @EmbeddedId
    private FavoriteCompanyId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("companyId")
    @JoinColumn(name = "company_id", referencedColumnName = "company_id")

    private Company company;

    @Column(name = "added_at")
    private Long addedAt;
}
