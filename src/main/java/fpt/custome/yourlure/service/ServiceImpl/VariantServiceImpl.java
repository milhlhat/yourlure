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

import javax.validation.ValidationException;
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
    public Boolean remove(Long variantId, Long productId) {

        //check variant is exist in order_line
        if (orderLineRepos.findByProductIdOrVariantId(variantId) == null) {
            if (productJPARepos.getById(productId).getVariantCollection().size() > 1) {
                variantRepos.deleteById(variantId);
                return true;
            } else {
                throw new ValidationException("Phải tồn tại ít nhất một biến thể!");
            }
        }
        throw new ValidationException("Biến thể có trong đơn thanh toán nên không thể xóa!");

    }

    @Override
    public Variant getById(Long id) {

        Optional<Variant> variant = variantRepos.findById(id);
        if (variant.isPresent()) {
            return variant.get();
        }
        throw new ValidationException("Không tìm thấy biến thể!");


    }
}

