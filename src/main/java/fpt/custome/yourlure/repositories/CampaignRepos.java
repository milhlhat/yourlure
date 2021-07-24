package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Campaign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CampaignRepos extends JpaRepository<Campaign, Long> {

    Page<Campaign> findByBannerContainsIgnoreCase(String keyword,Pageable pageable);

    @Query(value = "SELECT *\n" +
            "FROM tbl_campaign\n" +
            "WHERE tbl_campaign.start_date < CURRENT_DATE\n" +
            "    AND tbl_campaign.end_date > CURRENT_DATE\n" +
            "ORDER BY tbl_campaign.start_date DESC", nativeQuery = true)
    List<Campaign> findAllNewest();

    @Query(value = "SELECT *\n" +
            "FROM tbl_campaign\n" +
            "WHERE tbl_campaign.start_date < CURRENT_DATE\n" +
            "    AND tbl_campaign.end_date > CURRENT_DATE\n" +
            "ORDER BY tbl_campaign.start_date DESC LIMIT 1", nativeQuery = true)
    Optional<Campaign> findNewest();
}
