package com.example.apinext.service.product;

import com.example.apinext.model.Product;
import com.example.apinext.service.IGeneralService;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductService extends IGeneralService<Product,Long> {
    List<Product> findByCategory( String category);
}
