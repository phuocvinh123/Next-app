package com.example.apinext.controller.api;

import com.example.apinext.model.DTO.ImageDTO;
import com.example.apinext.model.DTO.VariantDTO;
import com.example.apinext.model.Images;
import com.example.apinext.model.Product;
import com.example.apinext.service.Variant.VariantService;
import com.example.apinext.service.images.IImagesService;
import com.example.apinext.service.images.ImagesService;
import com.example.apinext.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    @Autowired
    private ImagesService imagesService;
    @Autowired
    private VariantService variantsService;

    @GetMapping
    public ResponseEntity<?> getAllProduct(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Product> products = productService.PageAll(pageable);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/images/{productId}")
    public ResponseEntity<?> getAllImagesByProductId(@PathVariable Long productId) {
        List<VariantDTO> variants = variantsService.getAll(productId);
        return new ResponseEntity<>(variants, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        productService.save(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updateProduct = productService.findById(id).get();
        updateProduct.setTitle(product.getTitle());
        updateProduct.setPrice(product.getPrice());
        updateProduct.setCategory(product.getCategory());
        updateProduct.setDescription(product.getDescription());
        updateProduct.setImage((product.getImage()));
        productService.save(updateProduct);
        return new ResponseEntity<>(updateProduct, HttpStatus.OK);
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

    @GetMapping("/find/{productId}")
    public ResponseEntity<?> searchProduct(@PathVariable Long productId) {
        List<ImageDTO> imageDTOS = imagesService.findAllImagesBySize(productId);
        return new ResponseEntity<>(imageDTOS, HttpStatus.OK);
    }
}