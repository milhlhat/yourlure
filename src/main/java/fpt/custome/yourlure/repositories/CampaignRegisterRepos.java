package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.CampaignRegister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CampaignRegisterRepos extends JpaRepository<CampaignRegister, Long> {

    Long findAllByPhone(String phone);

    @Query(value = "SELECT\n" +
            "cr.* \n" +
            "FROM\n" +
            "tbl_campaign_register cr \n" +
            "WHERE\n" +
            "concat ( LOWER ( unaccent ( cr.username ) ), LOWER ( unaccent ( cr.phone ) ) ) LIKE LOWER ( unaccent ( ?1 ) )", nativeQuery = true)
    Page<CampaignRegister> findAllCampaignRegister(String keyword, Pageable pageable);
}
