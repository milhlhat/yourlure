package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Season;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SeasonRepos extends JpaRepository<Season, Long> {

    @Query(value = "SELECT * from tbl_season ss\n" +
            "WHERE lower(unaccent(ss.season_name)) like lower(unaccent(?1))",nativeQuery = true)
    Page<Season> findAllBySeasonName(String keyword, Pageable pageable);
}
