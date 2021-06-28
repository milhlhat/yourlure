package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.entity.Product;
import org.springframework.data.repository.Repository;

import javax.persistence.Query;

public interface ProductRepos extends Repository<Product, Long> {

    Query getProductFilter(Filter filter);

    void remove(Product product);

}
