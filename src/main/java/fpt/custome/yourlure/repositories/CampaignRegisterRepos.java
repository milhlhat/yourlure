package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.CampaignRegister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CampaignRegisterRepos extends JpaRepository<CampaignRegister, Long> {

    Optional<CampaignRegister> findAllByPhoneAndAndCampaign_CampaignId(String phone, Long campaignId);

    @Query(value = "SELECT\n" +
            "cr.* \n" +
            "FROM\n" +
            "tbl_campaign_register cr \n" +
            "WHERE\n" +
            "cr.campaign_id = ?2\n" +
            "and concat ( LOWER ( unaccent ( cr.username ) ), LOWER ( unaccent ( cr.phone ) ) ) LIKE LOWER ( unaccent ( ?1 ) )", nativeQuery = true)
    Page<CampaignRegister> findAllCampaignRegister(String keyword, Long campaignId, Pageable pageable);
}
