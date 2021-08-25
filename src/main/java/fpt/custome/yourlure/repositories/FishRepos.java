package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Fish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FishRepos extends JpaRepository<Fish, Long> {

    Page<Fish> findByFishNameContainsIgnoreCase(String keyword, Pageable pageable);

    Optional<Fish> findByFishNameContainsIgnoreCase(String keyword);

    Optional<Fish> findByFishNameIgnoreCase(String keyword);

}
