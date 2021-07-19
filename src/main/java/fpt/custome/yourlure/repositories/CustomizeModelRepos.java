package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomizeModelRepos extends JpaRepository<CustomizeModel, Long> {
    CustomizeModel findAllByCustomizeIdAndUserUserIdIs(Long customizeId, Long userId);

    List<CustomizeModel> findAllByUserUserIdAndModel3dProductProductId(Long userId, Long productId);
}
