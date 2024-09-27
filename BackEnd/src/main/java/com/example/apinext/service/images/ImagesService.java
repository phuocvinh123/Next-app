package com.example.apinext.service.images;

import com.example.apinext.model.DTO.ImageDTO;
import com.example.apinext.model.Images;
import com.example.apinext.model.Product;
import com.example.apinext.model.Size;
import com.example.apinext.repository.ImagesRepository;
import com.example.apinext.service.product.ProductService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ImagesService implements IImagesService{
    @Autowired
    private ImagesRepository imagesRepository;
    @Autowired
    private ProductService productService;
    @Override
    public List<Images> findAll() {
        return imagesRepository.findAll();
    }

    @Override
    public Optional<Images> findById(Long id) {
        return imagesRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(Images images) {
    imagesRepository.save(images);
    }

    @Override
    public void deleteById(Long id) {
    imagesRepository.deleteById(String.valueOf(id));
    }

    @Override
    public List<Images> findAllByProduct_Id(Long product_id) {
        return imagesRepository.findAllByProduct_Id(product_id);
    }
    public List<ImageDTO> findAllImagesBySize(Long productId) {
        Product product = productService.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        List<Size> sizes = product.getSizeList();
        List<Images> imagesList = imagesRepository.findAllByProduct_Id(product.getId());
        List<ImageDTO> imageDTOList = imagesList.stream()
                .map(image -> {
                    ImageDTO imageDTO = new ImageDTO();
                    imageDTO.setId(image.getId());
                    imageDTO.setUrl(image.getUrl());
                    imageDTO.setProduct(image.getProduct());

                    imageDTO.setColor(image.getColor());
                    imageDTO.setSize(sizes);

                    return imageDTO;
                }).collect(Collectors.toList());

        return imageDTOList;
    }
}
