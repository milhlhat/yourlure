package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.address.Province;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProvinceRepos extends JpaRepository<Province, Long> {
}
