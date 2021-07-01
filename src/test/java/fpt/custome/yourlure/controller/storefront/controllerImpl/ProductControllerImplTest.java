package fpt.custome.yourlure.controller.storefront.controllerImpl;

import fpt.custome.yourlure.controller.storefront.ProductController;
import fpt.custome.yourlure.dto.dtoOut.ProductsDetailDtoOut;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.repositories.ProductJpaRepos;
import fpt.custome.yourlure.service.ProductService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
class ProductControllerImplTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    @Mock
    private ProductJpaRepos productJPARepos;

    @Test
    void getById() throws Exception {
        //Prepare data
        long id = 1;
        ProductsDetailDtoOut productsDetailDtoOut = ProductsDetailDtoOut.builder().productId(id).build();
        Optional<ProductsDetailDtoOut> dto = Optional.of(productsDetailDtoOut);
        Optional<Product> findProduct = Optional.of(Product.builder().build());

        //mock data
        Mockito.when(productJPARepos.findById(id)).thenReturn(findProduct);
        Mockito.when(productService.getById(id)).thenReturn(productsDetailDtoOut);

        //run
        productController.getById(id);
    }

    @Test
    void getBestSeller() {
    }

    @Test
    void getNewestProduct() {
    }

    @Test
    void getProductFilter() {
    }

    @Test
    void download() {
    }
}