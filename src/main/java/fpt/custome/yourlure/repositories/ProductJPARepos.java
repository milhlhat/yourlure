package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ProductJPARepos extends JpaRepository<Product, Long> {

    @Query(value = "SELECT tbl_products.*, SUM(tbl_order_line.quantity)AS sumQuantity \n" +
            "FROM tbl_order_line,tbl_variants,tbl_products\n" +
            "WHERE tbl_order_line.variantid = tbl_variants.variantid\n" +
            "AND tbl_products.productid = tbl_variants.productid\n" +
            "GROUP BY tbl_products.product_name,tbl_products.productid\n" +
            "ORDER BY sumQuantity DESC\n" +
            "LIMIT 10", nativeQuery = true)
    List<Product> bestSellerProduct();

    List<Product> findAllByProductNameContainsIgnoreCase(String productName, Pageable pageable);

}
