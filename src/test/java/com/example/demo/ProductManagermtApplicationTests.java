//package com.example.demo;
//
//import com.example.demo.entity.Category;
//import com.example.demo.repositories.CategoryRepos;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.List;
//
//@SpringBootTest
//class ProductManagermtApplicationTests {
//
//	@Test
//	void contextLoads() {
//	}
//
//	@Autowired
//	private CategoryRepos categoryRepos;
//	@Test
//	void addCategory(){
//		Category cat = new Category("giay dep");
//		categoryRepos.save(cat);
//	}
//
//	@Test
//	void showCategories(){
//		List<Category> categories = (List<Category>) categoryRepos.findAll();
//		System.out.println("category: " + categories);
//	}
//
//}
