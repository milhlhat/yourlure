package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomizeRepos extends JpaRepository<CustomizeModel, Long> {
}
