package com.example.apinext.repository;

import com.example.apinext.model.ImageSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IImageSizeRepository extends JpaRepository<ImageSize,String> {
    List<ImageSize> getAllByImage_Id(Long image_id);
}
