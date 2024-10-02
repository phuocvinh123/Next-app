package com.example.apinext.repository;

import com.example.apinext.model.Rating;
import com.example.apinext.model.enums.ERating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRatingRepository extends JpaRepository<Rating ,String> {
    List<Rating> findAllByProduct_IdAndERating(Long product_id, ERating ERating);

}
