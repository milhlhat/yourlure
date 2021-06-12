package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepos extends JpaRepository<Campaign, Long> {
}
