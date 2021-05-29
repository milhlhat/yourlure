package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.repositories.CategoryRepos;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * The Foo class category controller
 */
@RestController
@RequiredArgsConstructor
@RequestMapping(path="/category")
public class CategoryController {
    @Autowired
    private CategoryRepos categoryRepos;

//    @GetMapping("/create-sample")
//    public void createSample() {
//        List<Category> categories = new ArrayList<>();
//        categories.add(new Category("giay dep", true));
//        categories.add(new Category("quan", true));
//        categories.add(new Category("ao", true));
//        for (Category category : categories) {
//            categoryRepos.save(category);
//        }
//    }

    /**
     * add category to data
     *
     * @param categoryInput list category
     * @return no return
     */
    @GetMapping("/add-category")
    public boolean addCategory(Category categoryInput) {
//        try {
//            if (categoryInput != null) {
//                if (!categoryRepos.findById(categoryInput.getId()).isPresent()) {
//                    categoryRepos.save(categoryInput);
//                } else {
//                    //category is present
//                    return false;
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        //category add successfull <3
        return true;
    }

    /**
     * add category to data
     *
     * @param categoryInput category update
     * @param idInput       id want to edit
     * @return no return
     */
    @GetMapping("/edit-category")
    public void editCategory(Category categoryInput, Long idInput) {
//        try {
//            if (idInput != null && categoryInput != null) {
//                Optional<Category> categories = categoryRepos.findById(idInput);
//                Category categoryToUpdate = categories.get();
//                categoryToUpdate.setName(categoryInput.getName());
//                categoryRepos.save(categoryToUpdate);
//            }
//        } catch (Exception e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
    }

    /**
     * show all category
     *
     * @return return list of category
     */
    @GetMapping("/show-cate")
    public List<Category> showCategories() {
        return (List<Category>) categoryRepos.findAll();
    }

}
