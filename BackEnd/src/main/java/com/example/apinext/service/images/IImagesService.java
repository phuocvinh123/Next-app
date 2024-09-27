package com.example.apinext.service.images;

import com.example.apinext.model.Images;
import com.example.apinext.service.IGeneralService;

import java.util.List;

public interface IImagesService extends IGeneralService<Images,Long> {
    List<Images> findAllByProduct_Id(Long product_id);
}
