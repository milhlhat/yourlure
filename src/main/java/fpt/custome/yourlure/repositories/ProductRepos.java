package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.Filter;
import fpt.custome.yourlure.entity.Product;
import org.springframework.data.repository.Repository;

import javax.persistence.Query;
import java.util.Optional;

public interface ProductRepos extends Repository<Product, Long> {

//    Product getByProductId(Long id);
//    Optional<Product> findByProductId(Long productId);

    Query getProductFilter(Filter filter);

    void remove(Product product);

}
