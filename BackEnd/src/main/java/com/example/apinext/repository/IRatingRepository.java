package com.example.apinext.repository;

import com.example.apinext.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IRatingRepository extends JpaRepository<Rating ,String> {
    List<Rating> findAllByProduct_Id(Long product_id);
    Optional<Rating> findByOrder_Id(Long order_id);
}
