package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepos extends JpaRepository<Category, Long> {

    @Query(value = "SELECT * \n" +
            "FROM  (SELECT tbl_category.*, SUM(tbl_order_line.quantity) AS sum_quantity\n" +
            ", row_number() over (partition by tbl_category.category_name) as category_rank   \n" +
            "FROM tbl_category, tbl_products, tbl_variants, tbl_order_line\n" +
            "WHERE tbl_category.category_id = tbl_products.category_id\n" +
            "AND tbl_products.product_id = tbl_variants.product_id\n" +
            "AND tbl_variants.variant_id = tbl_order_line.variant_id\n" +
            "GROUP BY tbl_category.category_name,tbl_category.category_id) AS rankCategory \n" +
            "WHERE category_rank <= 10 \n" +
            " ORDER BY sum_quantity DESC ", nativeQuery = true)
    List<Category> getBestSellerWithCategory();

    @Query(value = "SELECT ct.*, COALESCE(SUM(ol.quantity),0) AS sum_quantity\n" +
            "FROM tbl_category ct\n" +
            "left join tbl_products pr on ct.category_id = pr.category_id\n" +
            "left join tbl_variants v on pr.product_id = v.product_id\n" +
            "left  join tbl_order_line ol on v.variant_id = ol.variant_id\n" +
            "GROUP BY ct.category_name,ct.category_id\n" +
            "ORDER BY sum_quantity DESC,ct.category_id ASC ", nativeQuery = true)
    List<Category> getBestSellerCategory();

    List<Category> findByCategoryNameContainsIgnoreCase(String keyword, Pageable pageable);

    Optional<Category> findByCategoryName(String keyword);

}
