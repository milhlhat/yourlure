package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomizeModelRepos extends JpaRepository<CustomizeModel, Long> {
    CustomizeModel findAllByCustomizeIdAndUserUserIdIs(Long customizeId, Long userId);

    @Query(value = "INSERT INTO tbl_customize(\"name\", thumbnail_url, model_id)\n" +
            "VALUES (?1, ?2, ?3)", nativeQuery = true)
    CustomizeModel saveWithoutUser(String name, String thumbnailUrl, Long modelId);

    @Query(value = "SELECT tbl_customize.* FROM tbl_customize\n" +
            "JOIN tbl_users on tbl_customize.user_id = tbl_users.user_id\n" +
            "JOIN tbl_model_3d on tbl_customize.model_id = tbl_model_3d.model_id\n" +
            "JOIN tbl_products on tbl_model_3d.product_id = tbl_products.product_id\n" +
            "WHERE tbl_users.user_id = ?1 AND tbl_products.product_id = ?2", nativeQuery = true)
    List<CustomizeModel> findAllByUserIdAndProductId(Long userId, Long productId);

    void deleteByCustomizeId(Long customizeId);
}
