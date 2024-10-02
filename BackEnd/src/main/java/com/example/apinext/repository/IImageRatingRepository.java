package com.example.apinext.repository;

import com.example.apinext.model.ImageRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImageRatingRepository extends JpaRepository<ImageRating,String> {
}
