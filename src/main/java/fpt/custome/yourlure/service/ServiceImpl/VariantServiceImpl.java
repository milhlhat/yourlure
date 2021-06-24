package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.VariantDtoInput;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.entity.Variant;
import fpt.custome.yourlure.repositories.ProductJpaRepos;
import fpt.custome.yourlure.repositories.VariantRepos;
import fpt.custome.yourlure.service.VariantService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class VariantServiceImpl implements VariantService {

    @Autowired
    private VariantRepos variantRepos;

    @Autowired
    private ProductJpaRepos productJPARepos;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Boolean save(VariantDtoInput variantDtoInput) {
        try {
            Optional<Product> productOptional = productJPARepos.findById(variantDtoInput.getProductId());
            Product product = productOptional.get();
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
}
