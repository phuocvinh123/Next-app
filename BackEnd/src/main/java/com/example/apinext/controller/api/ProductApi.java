package com.example.apinext.controller.api;

import com.example.apinext.model.Product;
import com.example.apinext.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductApi {
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<?> getAllProduct() {
        List<Product> products = productService.findAll();
        Collections.reverse(products);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        productService.save(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping({"/", "/{category}"})
    public ResponseEntity<?> getProductsByCategory(@PathVariable(required = false) String category) {
        List<Product> products;
        if (category == null || category.isEmpty()) {
            products = productService.findAll();
        } else {
            products = productService.findByCategory(category);
        }
        Collections.reverse(products);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        productService.deleteById(productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}