package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.VariantDtoInput;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.entity.Variant;
import fpt.custome.yourlure.repositories.OrderLineRepos;
import fpt.custome.yourlure.repositories.ProductJpaRepos;
import fpt.custome.yourlure.repositories.VariantRepos;
import fpt.custome.yourlure.service.FileService;
import fpt.custome.yourlure.service.VariantService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.ValidationException;
import java.io.File;
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
    private FileService fileService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Object save(VariantDtoInput variantDtoInput) {

        Product product = productJPARepos.getById(variantDtoInput.getProductId());
        if (product == null) {
            throw new ValidationException("Mã sản phẩm không tồn tại!");
        }
        Variant variantInput = modelMapper.map(variantDtoInput, Variant.class);
        variantInput.setProduct(product);
        variantRepos.save(variantInput);
        return "Đã thêm biến thể mới!";

    }

    @Override
    @Transactional
    public Object update(VariantDtoInput variantDtoInput, Long variantId) {

        Optional<Product> productOptional = productJPARepos.findById(variantDtoInput.getProductId());
        Product product = productOptional.get();

        Variant variantInput = modelMapper.map(variantDtoInput, Variant.class);
        variantInput.setProduct(product);
        variantInput.setVariantId(variantId);
        variantRepos.save(variantInput);
        return "Cập nhật biến thành công!";

    }

    @Override
    @Transactional
    public Object remove(Long variantId, Long productId) {

        //check variant is exist in order_line
        if (orderLineRepos.findByVariantId(variantId) == null) {
            Product product = productJPARepos.getById(productId);
            if (product.getVariantCollection().size() > 1) {
                Variant variant = variantRepos.getById(variantId);
                fileService.deleteFile(variant.getImageUrl());
                product.getVariantCollection().remove(variant);
                productJPARepos.save(product);
                return "Xóa biến thể thành công!";


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

