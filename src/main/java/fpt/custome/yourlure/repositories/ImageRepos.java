package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepos extends JpaRepository<Image, Long> {

    void deleteByProductProductId(Long id);

    void deleteByCampaign_CampaignId(Long id);

}
