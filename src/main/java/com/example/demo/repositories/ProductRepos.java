package com.example.demo.repositories;

import com.example.demo.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


public interface ProductRepos extends JpaRepository<Product, Long> {

    @Query(value = "SELECT tbl_products.*, SUM(tbl_order_line.quantity)AS sumQuantity \n" +
            "FROM tbl_order_line,tbl_variants,tbl_products\n" +
            "WHERE tbl_order_line.variantid = tbl_variants.variantid\n" +
            "AND tbl_products.productid = tbl_variants.productid\n" +
            "GROUP BY tbl_products.product_name,tbl_products.productid\n" +
            "ORDER BY sumQuantity DESC\n" +
            "LIMIT 10", nativeQuery = true)
    List<Product> bestSellerProduct();

    @Query(value = "SELECT tbl_products.* \n" +
            "FROM tbl_category,tbl_products,tbl_fish_product,tbl_fish\n" +
            "WHERE tbl_category.categoryid = tbl_products.categoryid\n" +
            "AND tbl_products.productid = tbl_fish_product.productid\n" +
            "AND tbl_fish_product.fishid = tbl_fish.fishid\n" +
            "and tbl_category.categoryid IN :cate_ids\n" +
            "AND tbl_fish.fishid IN :fish_ids", nativeQuery = true)
    List<Product> getProductByCategory(@RequestParam("cate_ids") List<Long> cate_ids,
                                       @RequestParam("fish_ids") List<Long> fish_ids);

    List<Product> findAllByProductNameContainsIgnoreCase(String productName, Pageable pageable);

}
