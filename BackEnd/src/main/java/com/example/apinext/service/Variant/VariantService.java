package com.example.apinext.service.Variant;

import com.example.apinext.model.DTO.ImageDTO;
import com.example.apinext.model.DTO.ImageSizeDTO;
import com.example.apinext.model.DTO.VariantDTO;
import com.example.apinext.model.ImageSize;
import com.example.apinext.model.Images;
import com.example.apinext.model.Product;
import com.example.apinext.model.Variant;
import com.example.apinext.repository.IVariantRepository;
import com.example.apinext.service.imageSize.ImageSizeService;
import com.example.apinext.service.images.ImagesService;
import com.example.apinext.service.product.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class VariantService implements IVariantService{
    @Autowired
    private IVariantRepository variantRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private ImagesService imagesService;
    @Autowired
    private ImageSizeService imageSizeService;
    @Override
    public List<Variant> findAll() {
        return variantRepository.findAll();
    }

    @Override
    public Optional<Variant> findById(Long id) {
        return variantRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(Variant variant) {
    variantRepository.save(variant);
    }

    @Override
    public void deleteById(Long id) {
    variantRepository.deleteById(String.valueOf(id));
    }

    public List<Variant> getAllByProductId(Long productId){
        return variantRepository.findAllByProduct_Id(productId);
    }

    public List<VariantDTO> getAll(Long productId) {
        Product product = productService.findById(productId).orElse(null);
        if (product == null) {
            return new ArrayList<>();
        }

        List<Variant> variants = variantRepository.findAllByProduct_Id(productId);
        List<VariantDTO> variantDTOs = new ArrayList<>();

        for (Variant variant : variants) {
            VariantDTO variantDTO = new VariantDTO();
            variantDTO.setVariant(variant);

            List<Images> images = imagesService.getAllImageByVariantId(variant.getId());

            List<ImageDTO> simpleImages = images.stream()
                    .map(image -> new ImageDTO(image.getId(),image.getUrl(),image.getStock(),image.getPrice()))
                    .collect(Collectors.toList());
            variantDTO.setImages(simpleImages);

            List<ImageSizeDTO> simpleImageSizes = new ArrayList<>();

            for (Images image : images) {
                List<ImageSize> imageSizes = imageSizeService.getAllByImageSizeByImageId(image.getId());

                for (ImageSize imageSize : imageSizes) {
                    simpleImageSizes.add(new ImageSizeDTO(imageSize.getId(),imageSize.getImage().getId(),imageSize.getSize().getSizeName()));
                }
            }
            variantDTO.setImageSizes(simpleImageSizes);

            variantDTOs.add(variantDTO);
        }

        return variantDTOs;
    }
}
