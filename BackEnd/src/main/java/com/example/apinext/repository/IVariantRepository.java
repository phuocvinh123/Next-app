package com.example.apinext.repository;

import com.example.apinext.model.Variant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IVariantRepository extends JpaRepository<Variant,String> {
    List<Variant> findAllByProduct_Id(Long product_id);
}
