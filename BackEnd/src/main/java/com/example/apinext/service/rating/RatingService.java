package com.example.apinext.service.rating;

import com.example.apinext.model.Customer;
import com.example.apinext.model.DTO.RatingDto;
import com.example.apinext.model.Order;
import com.example.apinext.model.Product;
import com.example.apinext.model.Rating;
import com.example.apinext.model.enums.ERating;
import com.example.apinext.repository.IRatingRepository;
import com.example.apinext.service.customer.CustomerService;
import com.example.apinext.service.order.OrderService;
import com.example.apinext.service.product.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RatingService implements IRatingService{
    @Autowired
    private IRatingRepository ratingRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private OrderService orderService;
    @Override
    public List<Rating> findAll() {
        return ratingRepository.findAll();
    }

    @Override
    public Optional<Rating> findById(Long id) {
        return ratingRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(Rating rating) {
    ratingRepository.save(rating);
    }

    @Override
    public void deleteById(Long id) {
    ratingRepository.deleteById(String.valueOf(id));
    }

    public void saveRating(RatingDto ratingDto) {
        Product product = productService.findById(ratingDto.getProductId()).get();
        Customer customer = customerService.findById(ratingDto.getCustomerId()).get();
        Rating rating = new Rating();
        rating.setCustomer(customer);
        rating.setProduct(product);
        rating.setCreateAt(String.valueOf(ratingDto.getDate()));
        rating.setComment(ratingDto.getComment());
        rating.setStar(ratingDto.getStar());
        rating.setERating(ERating.PENDING);
        ratingRepository.save(rating);
        Order order = orderService.findById(ratingDto.getOrderId()).get();
        order.setStatusRating(true);
        orderService.save(order);

    }

    public List<Rating> findAllRatingByProductIdAndEStatusRating(Long productId,String status){
        return ratingRepository.findAllByProduct_IdAndERating(productId, ERating.valueOf(status));
    }
}
