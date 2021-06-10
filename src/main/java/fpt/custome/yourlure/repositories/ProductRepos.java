package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.entity.Product;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface ProductRepos extends Repository<Product, Long> {

    List<Product> getProductFilter(Filter filter);

}
