package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.CategoryDtoInput;
import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOut;
import fpt.custome.yourlure.dto.dtoOut.CategoryDtoOutWithCategory;
import fpt.custome.yourlure.entity.Category;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.repositories.CategoryRepos;
import fpt.custome.yourlure.repositories.ProductJpaRepos;
import fpt.custome.yourlure.service.CategoryService;
import fpt.custome.yourlure.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepos categoryRepos;

    @Autowired
    private ProductJpaRepos productJPARepos;

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<CategoryDtoOut> getAll() {
        List<Category> categoryList = categoryRepos.findAll();
        List<CategoryDtoOut> categoryDtoOuts = new ArrayList<>();
        for (Category category : categoryList) {
            CategoryDtoOut categoryDtoOut = mapper.map(category, CategoryDtoOut.class);
            categoryDtoOuts.add(categoryDtoOut);
        }
        return categoryDtoOuts;
    }

    @Override
    public Optional<CategoryDtoOut> getById(Long id) {
        //Todo: validate

        Optional<Category> category = categoryRepos.findById(id);
        if (category.isPresent()) {
            CategoryDtoOut categoryDtoOut = mapper.map(category.get(), CategoryDtoOut.class);
            return Optional.of(categoryDtoOut);
        }
        return Optional.empty();
    }

    @Override
    public List<CategoryDtoOut> search(String keyword, Pageable pageable) {
        try {
            List<CategoryDtoOut> result = new ArrayList<>();
            List<Category> list = categoryRepos.findByCategoryNameContainsIgnoreCase(keyword, pageable);
            for (Category item : list) {
                CategoryDtoOut dtoOut = mapper.map(item, CategoryDtoOut.class);
                result.add(dtoOut);
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<CategoryDtoOutWithCategory> getBestSellerWithCategory() {
        List<CategoryDtoOutWithCategory> result = new ArrayList<>();
        List<Category> list = categoryRepos.getBestSellerCategory();
        //set lai danh sach product theo category
        for (Category item : list) {
            List<Product> productCollection = productJPARepos.bestSellerProductByCategory(item.getCategoryId());
            item.setProductCollection(productCollection);
        }
        // map by to CategoryDtoOutWithCategory to return
        for (Category item : list) {
            CategoryDtoOutWithCategory dtoOut = mapper.map(item, CategoryDtoOutWithCategory.class);
            result.add(dtoOut);
        }
        return result;
    }

    @Override
    public Boolean updateCategory(CategoryDtoInput categoryInput, Long idInput) {
        try {
            if (idInput != null && categoryInput != null) {
                Category categoryToUpdate = categoryRepos.findById(idInput).get();
                categoryToUpdate.setCategoryName(categoryInput.getCategoryName());
                categoryRepos.save(categoryToUpdate);
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean saveCate(CategoryDtoInput categoryInput) {
        Category category;
        if (categoryInput != null)
            category = mapper.map(categoryInput, Category.class);
        else return false;
        return categoryRepos.save(category) == null ? false : true;
    }

    @Override
    public Boolean removeCategory(Long idInput) {
        try {
//            Optional<Category> categoryRemove = categoryRepos.findById(idInput);
//            if (categoryRemove.isPresent()) {
//                List<Product> productList = (List<Product>) categoryRemove.get().getProductCollection();
//                for (Product product : productList) {
//                    productService.remove(product.getProductId());
//                }
//            }
            categoryRepos.deleteById(idInput);
        } catch (
                Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
