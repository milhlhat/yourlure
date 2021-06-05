package com.example.demo.repositories;

import com.example.demo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepos extends JpaRepository<Category, Long> {

    @Query(value = "SELECT * \n" +
            "FROM  (SELECT tbl_category.*, SUM(tbl_order_line.quantity) AS sum_quantity\n" +
            ", row_number() over (partition by tbl_category.category_name order by SUM(tbl_order_line.quantity) desc) as category_rank   \n" +
            "FROM tbl_category, tbl_products, tbl_variants, tbl_order_line\n" +
            "WHERE tbl_category.categoryid = tbl_products.categoryid\n" +
            "AND tbl_products.productid = tbl_variants.productid\n" +
            "AND tbl_variants.variantid = tbl_order_line.variantid\n" +
            "GROUP BY tbl_category.category_name,tbl_category.categoryid) AS rankCategory\n" +
            "WHERE category_rank <= 10", nativeQuery = true)
    List<Category> getBestSellerWithCategory();
}
