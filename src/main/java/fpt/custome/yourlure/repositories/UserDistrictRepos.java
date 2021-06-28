package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.address.District;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserDistrictRepos extends JpaRepository<District, Long> {

    List<District> findDistrictByUserProvinceUserProvinceID(Long Id);
}
