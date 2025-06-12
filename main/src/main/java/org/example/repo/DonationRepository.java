package org.example.repo;

import org.example.models.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository  extends JpaRepository<Donation, Long> {
    public List<Donation> findAllByDonorId(Long donorId);
}
