package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepos extends JpaRepository<Category, Long>{

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

    @Query(value = "SELECT tbl_category.*, SUM(tbl_order_line.quantity) AS sum_quantity\n" +
            "FROM tbl_category, tbl_products, tbl_variants, tbl_order_line\n" +
            "WHERE tbl_category.category_id = tbl_products.category_id\n" +
            "AND tbl_products.product_id = tbl_variants.product_id\n" +
            "AND tbl_variants.variant_id = tbl_order_line.variant_id\n" +
            "GROUP BY tbl_category.category_name,tbl_category.category_id\n" +
            "ORDER BY sum_quantity DESC ", nativeQuery = true)
    List<Category> getBestSellerCategory();

//    List<Product> findById(String productName, Pageable pageable);
}
