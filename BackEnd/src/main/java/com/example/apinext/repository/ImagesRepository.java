package com.example.apinext.repository;

import com.example.apinext.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagesRepository extends JpaRepository<Images,String> {
    List<Images> findAllByProduct_Id(Long product_id);
}
