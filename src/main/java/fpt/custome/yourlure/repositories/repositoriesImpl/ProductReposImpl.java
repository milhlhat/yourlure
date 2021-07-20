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
        query.append("left join tbl_category ON tbl_products.category_id = tbl_category.category_id \n");
        query.append("left join tbl_fish_product ON tbl_products.product_id = tbl_fish_product.product_id \n");
        query.append("left JOIN tbl_fish ON tbl_fish_product.fish_id = tbl_fish.fish_id \n");
        query.append("LEFT JOIN tbl_variants ON tbl_products.product_id = tbl_variants.product_id\n");
        query.append("LEFT JOIN tbl_order_line ON tbl_order_line.variant_id = tbl_variants.variant_id \n");
        query.append("LEFT JOIN tbl_orders ON tbl_orders.order_id = tbl_order_line.order_id \n");
        query.append("where 1 = 1 \n");
        query.append("and tbl_products.visible_in_storefront = true \n");
        if (!filter.getListCateId().isEmpty()) {
            query.append(" and tbl_category.category_id IN (:cateIds) \n");
        }
        if (!filter.getListFishId().isEmpty()) {
            query.append(" and tbl_fish.fish_id IN (:fishIds) \n");
        }
        if (filter.getCustom()) {
            query.append(" and tbl_products.customizable = true \n");
        }
        if (!filter.getKeyword().trim().isEmpty()) {
            query.append("and to_tsvector('simple',COALESCE(lower(unaccent(tbl_products.product_name)),'')\n" +
                    " ) @@ \n" +
                    "to_tsquery('simple',lower(unaccent('''" + filter.getKeyword().trim()+" '':*'))) \n");
        }
        query.append(" GROUP BY tbl_products.product_id,tbl_products.product_name \n");

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
            query.append(" order by " + filter.getSortBy());
            if (!filter.getIsAsc()) {
                query.append(" DESC");
            }
        }

        Query result = em.createNativeQuery(query.toString(), Product.class);
        if (!filter.getListCateId().isEmpty()) result.setParameter("cateIds", filter.getListCateId());
        if (!filter.getListFishId().isEmpty()) result.setParameter("fishIds", filter.getListFishId());
        return result;
    }

    public void remove(Product product) {
        em.remove(product);
    }
}
