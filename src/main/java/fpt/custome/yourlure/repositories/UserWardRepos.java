package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.address.Ward;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserWardRepos extends JpaRepository<Ward, Long> {

    List<Ward> findByUserDistrictUserDistrictID(Long id, Pageable pageable);
}
