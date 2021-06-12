package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.address.District;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDistrictRepos extends JpaRepository<District, Long> {
}
