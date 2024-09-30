package com.example.apinext.service.imageSize;

import com.example.apinext.model.ImageSize;
import com.example.apinext.repository.IImageSizeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ImageSizeService implements IImageSizeService{
    @Autowired
    private IImageSizeRepository imageSizeRepository;
    @Override
    public List<ImageSize> findAll() {
        return imageSizeRepository.findAll();
    }

    @Override
    public Optional<ImageSize> findById(Long id) {
        return imageSizeRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(ImageSize imageSize) {
    imageSizeRepository.save(imageSize);
    }

    @Override
    public void deleteById(Long id) {
    imageSizeRepository.deleteById(String.valueOf(id));
    }

    public List<ImageSize> getAllByImageSizeByImageId(Long imageId) {
        return imageSizeRepository.getAllByImage_Id(imageId);
    }
}
