package com.example.apinext.service.product;

import com.example.apinext.model.Product;
import com.example.apinext.repository.IProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class ProductService implements IProductService{
    @Autowired
    private IProductRepository productRepository;
    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(Product product) {
    productRepository.save(product);
    }

    @Override
    public void deleteById(Long id) {
    productRepository.deleteById(String.valueOf(id));
    }

    @Override
    public List<Product> findByCategory(String category) {
        return productRepository.findByCategory(String.valueOf(category));
    }
}
