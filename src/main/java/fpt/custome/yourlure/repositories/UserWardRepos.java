package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.address.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserWardRepos extends JpaRepository<Ward, Long> {
}
