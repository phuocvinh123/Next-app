package com.example.apinext.service.imageRating;

import com.example.apinext.model.ImageRating;
import com.example.apinext.repository.IImageRatingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ImageRatingService implements IImageRatingService{
    @Autowired
    private IImageRatingRepository imageRatingRepository;
    @Override
    public List<ImageRating> findAll() {
        return imageRatingRepository.findAll();
    }

    @Override
    public Optional<ImageRating> findById(Long id) {
        return imageRatingRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(ImageRating imageRating) {
    imageRatingRepository.save(imageRating);
    }

    @Override
    public void deleteById(Long id) {
    imageRatingRepository.deleteById(String.valueOf(id));
    }
}
