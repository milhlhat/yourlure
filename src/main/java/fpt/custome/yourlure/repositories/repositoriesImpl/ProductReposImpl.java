package fpt.custome.yourlure.repositories.repositoriesImpl;

import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.repositories.ProductRepos;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class ProductReposImpl implements ProductRepos {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Product> getProductFilter(Filter filter) {
        StringBuilder query = new StringBuilder();
        query.append("SELECT tbl_products.*, SUM(tbl_order_line.quantity)AS sumQuantity \n");
        query.append(" FROM tbl_category,tbl_products,tbl_fish_product,tbl_fish,tbl_orders,tbl_order_line,tbl_variants \n");
        query.append("  WHERE tbl_category.categoryid = tbl_products.categoryid  \n");
        query.append("  AND tbl_products.productid = tbl_fish_product.productid \n");
        query.append(" AND tbl_fish_product.fishid = tbl_fish.fishid \n");
        query.append(" AND tbl_order_line.variantid = tbl_variants.variantid \n");
        query.append(" AND tbl_products.productid = tbl_variants.productid \n");
        query.append(" AND tbl_orders.orderid = tbl_order_line.oderid  \n");
        if (!filter.getListCateId().isEmpty()) {
            query.append(" AND tbl_category.categoryid IN (:cateIds) \n");
        }
        if (!filter.getListFishId().isEmpty()) {
            query.append(" AND tbl_fish.fishid IN (:fishIds) \n");
        }
        if (filter.getCustom()) {
            query.append(" AND tbl_products.customizable = true ");
        }
        if (!filter.getKeyword().isEmpty()) {
            query.append("AND tbl_products.product_name like :keyword ");
        }
        query.append(" GROUP BY tbl_products.productid,tbl_products.product_name \n");

        /**
         * sort by:
         * sumQuantity: best seller
         * date_create
         * default_price
         */
        if (!(filter.getSortBy().isEmpty())) {
            query.append("order by " + filter.getSortBy());
            if (!filter.getIsAsc()){
                query.append(" DESC");
            }
        }

        Query result = em.createNativeQuery(query.toString(),Product.class);
        result.setFirstResult(filter.getLimit() * filter.getPage());
        result.setMaxResults(filter.getLimit());
        if (!filter.getListCateId().isEmpty()) result.setParameter("cateIds", filter.getListCateId());
        if (!filter.getListFishId().isEmpty()) result.setParameter("fishIds", filter.getListFishId());
        if (!filter.getKeyword().isEmpty()) result.setParameter("keyword", "%" + filter.getKeyword() + "%");
        List<Product> list = result.getResultList();
        return list;
    }
}
