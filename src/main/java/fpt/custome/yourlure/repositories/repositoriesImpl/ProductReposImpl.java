package fpt.custome.yourlure.repositories.repositoriesImpl;

import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.repositories.ProductRepos;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

public class ProductReposImpl implements ProductRepos {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Query getProductFilter(Filter filter) {
        StringBuilder query = new StringBuilder();
        query.append("SELECT  DISTINCT tbl_products.*, SUM(tbl_order_line.quantity)AS sumQuantity FROM tbl_products\n");
        query.append("left join tbl_category ON tbl_products.categoryid = tbl_category.categoryid \n");
        query.append("left join tbl_fish_product ON tbl_products.productid = tbl_fish_product.productid \n");
        query.append("left JOIN tbl_fish ON tbl_fish_product.fishid = tbl_fish.fishid \n");
        query.append("LEFT JOIN tbl_variants ON tbl_products.productid = tbl_variants.productid\n");
        query.append("LEFT JOIN tbl_order_line ON tbl_order_line.variantid = tbl_variants.variantid \n");
        query.append("LEFT JOIN tbl_orders ON tbl_orders.orderid = tbl_order_line.oderid \n");
        if (!filter.getListCateId().isEmpty()) {
            query.append(" AND tbl_category.categoryid IN (:cateIds) \n");
        }
        if (!filter.getListFishId().isEmpty()) {
            query.append(" AND tbl_fish.fishid IN (:fishIds) \n");
        }
        if (filter.getCustom()) {
            query.append(" AND tbl_products.customizable = true \n");
        }
        if (!filter.getKeyword().isEmpty()) {
            query.append("AND UPPER( tbl_products.product_name) like UPPER(:keyword) \n");
        }
        query.append(" GROUP BY tbl_products.productid,tbl_products.product_name \n");

        /**
         * isAsc: true: tăng dần
         *        false: giảm dần
         *
         * sort by:
         * sumQuantity: best seller
         * date_create : mới nhất
         * default_price: xếp theo giá
         */
        if (!(filter.getSortBy().isEmpty())) {
            query.append("order by " + filter.getSortBy());
            if (!filter.getIsAsc()){
                query.append(" DESC");
            }
        }

        Query result = em.createNativeQuery(query.toString(),Product.class);
        if (!filter.getListCateId().isEmpty()) result.setParameter("cateIds", filter.getListCateId());
        if (!filter.getListFishId().isEmpty()) result.setParameter("fishIds", filter.getListFishId());
        if (!filter.getKeyword().isEmpty()) result.setParameter("keyword", "%" + filter.getKeyword() + "%");
        return result;
    }
}
