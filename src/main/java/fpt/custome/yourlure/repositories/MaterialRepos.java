package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.customizemodel.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialRepos extends JpaRepository<Material, Long> {

    List<Material> findAllByMaterialIdIn(List<Long> ids);
}
