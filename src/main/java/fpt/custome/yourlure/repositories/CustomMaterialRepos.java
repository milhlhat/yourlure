package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.customizemodel.CustomMaterial;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CustomMaterialRepos extends JpaRepository<CustomMaterial, Long> {
    void deleteAllByCustomizeModelCustomizeId(Long customModelId);
}
