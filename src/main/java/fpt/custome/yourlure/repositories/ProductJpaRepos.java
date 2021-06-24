package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ProductJpaRepos extends JpaRepository<Product, Long> {

    @Query(value = "SELECT tbl_products.*, SUM(tbl_order_line.quantity)AS sumQuantity \n" +
            "FROM tbl_order_line,tbl_variants,tbl_products\n" +
            "WHERE tbl_order_line.variant_id = tbl_variants.variant_id\n" +
            "AND tbl_products.product_id = tbl_variants.product_id\n" +
            "GROUP BY tbl_products.product_name,tbl_products.product_id\n" +
            "ORDER BY sumQuantity DESC\n" +
            "LIMIT 10", nativeQuery = true)
    List<Product> bestSellerProduct();

    @Query(value = "SELECT tbl_products.* , SUM(tbl_order_line.quantity)AS sumQuantity \n" +
            "FROM  tbl_products,tbl_variants, tbl_order_line\n" +
            "where  tbl_products.product_id = tbl_variants.product_id\n" +
            "AND tbl_order_line.variant_id = tbl_variants.variant_id\n" +
            "and tbl_products.category_id = ?1 \n" +
            "GROUP BY tbl_products.product_name,tbl_products.product_id\n" +
            "ORDER BY sumQuantity   DESC ", nativeQuery = true)
    List<Product> bestSellerProductByCategory(Long id);


    List<Product> findAllByProductNameContainsIgnoreCase(String productName, Pageable pageable);

}
