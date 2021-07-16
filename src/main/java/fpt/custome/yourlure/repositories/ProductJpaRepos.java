package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ProductJpaRepos extends JpaRepository<Product, Long> {

    @Query(value = "SELECT\n" +
            "        pr.*,\n" +
            "        SUM(ol.quantity)AS sumQuantity  \n" +
            "    FROM\n" +
            "        tbl_products pr\n" +
            "\t\t\t\t  LEFT JOIN tbl_variants v ON pr.product_id = v.product_id \n" +
            "    LEFT JOIN tbl_order_line ol ON  ol.variant_id = v.variant_id \n" +
            "  where pr.visible_in_storefront = true " +
            "    GROUP BY\n" +
            "        pr.product_name,\n" +
            "        pr.product_id \n" +
            "    ORDER BY\n" +
            "        sumQuantity,product_id DESC LIMIT 10\n", nativeQuery = true)
    List<Product> bestSellerProduct();

    @Query(value = "SELECT\n" +
            "pr.*,\n" +
            "SUM(ol.quantity)AS sumQuantity  \n" +
            "FROM tbl_products pr\n" +
            "LEFT JOIN tbl_variants v ON pr.product_id = v.product_id \n" +
            "LEFT JOIN tbl_order_line ol ON  ol.variant_id = v.variant_id \n" +
            "WHERE pr.category_id = ?1\n" +
            "and pr.visible_in_storefront = true\n" +
            "GROUP BY\n" +
            "pr.product_name,\n" +
            "pr.product_id \n" +
            "ORDER BY\n" +
            "sumQuantity,product_id DESC  ", nativeQuery = true)
    List<Product> bestSellerProductByCategory(Long id);


    Page<Product> findAllByProductNameContainsIgnoreCase(String productName, Pageable pageable);

    Page<Product> findAllByVisibleInStorefront(Boolean visibleInStorefront, Pageable pageable);

}
