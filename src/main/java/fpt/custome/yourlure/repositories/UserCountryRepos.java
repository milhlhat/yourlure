package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.address.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCountryRepos extends JpaRepository<Country, Long> {
}
