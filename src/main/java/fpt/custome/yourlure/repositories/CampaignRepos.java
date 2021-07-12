package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Campaign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepos extends JpaRepository<Campaign, Long> {

    Page<Campaign> findByBannerContainsIgnoreCase(String keyword,Pageable pageable);
}
