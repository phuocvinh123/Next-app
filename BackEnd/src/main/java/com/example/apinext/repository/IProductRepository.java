package com.example.apinext.repository;

import com.example.apinext.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product,String> {
    @Query("SELECT p FROM Product p WHERE (:category IS NULL OR :category = '' OR p.category = :category)")
    List<Product> findByCategory(@Param("category") String category);

}
