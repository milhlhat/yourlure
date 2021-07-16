package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.VariantDtoInput;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.entity.Variant;
import fpt.custome.yourlure.repositories.OrderLineRepos;
import fpt.custome.yourlure.repositories.ProductJpaRepos;
import fpt.custome.yourlure.repositories.VariantRepos;
import fpt.custome.yourlure.service.VariantService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VariantServiceImpl implements VariantService {

    @Autowired
    private VariantRepos variantRepos;

    @Autowired
    private OrderLineRepos orderLineRepos;

    @Autowired
    private ProductJpaRepos productJPARepos;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Boolean save(VariantDtoInput variantDtoInput) {
        try {
            Product product = productJPARepos.getById(variantDtoInput.getProductId());
            Variant variantInput = modelMapper.map(variantDtoInput, Variant.class);
            variantInput.setProduct(product);
            variantRepos.save(variantInput);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean update(VariantDtoInput variantDtoInput, Long variantId) {
        try {
            Optional<Product> productOptional = productJPARepos.findById(variantDtoInput.getProductId());
            Product product = productOptional.get();
            Variant variantInput = modelMapper.map(variantDtoInput, Variant.class);
            variantInput.setProduct(product);
            variantInput.setVariantId(variantId);
            variantRepos.save(variantInput);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean remove(Long id) {
        try {
            //check variant is exist in order_line
            if (orderLineRepos.findByProductIdOrVariantId(id) == null) {
                variantRepos.deleteById(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Optional<Variant> getById(Long id) {
        try {
            Variant variant = variantRepos.getById(id);
            if (variant != null){
                return Optional.of(variant);
            }
            return Optional.empty();
        }catch (Exception e){
            e.printStackTrace();
            return Optional.empty();
        }
    }
}

