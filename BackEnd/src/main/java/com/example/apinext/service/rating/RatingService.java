package com.example.apinext.service.rating;

import com.example.apinext.model.*;

import com.example.apinext.model.DTO.*;
import com.example.apinext.model.enums.ERating;
import com.example.apinext.repository.IRatingRepository;
import com.example.apinext.service.customer.CustomerService;
import com.example.apinext.service.imageRating.ImageRatingService;
import com.example.apinext.service.order.OrderService;
import com.example.apinext.service.orderDetail.OrderDetailService;
import com.example.apinext.service.product.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

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
    @Autowired
    private ImageRatingService imageRatingService;
    @Autowired
    private OrderDetailService orderDetailService;
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
        Order order = orderService.findById(ratingDto.getOrderId()).get();
        order.setStatusRating(true);
        orderService.save(order);
        rating.setOrder(order);
        ratingRepository.save(rating);
        ImageRating imageRating = new ImageRating();
        imageRating.setUrlImage(ratingDto.getImageUrl());
        imageRating.setRating(rating);
        imageRatingService.save(imageRating);
    }

    public List<RatingResDto> findAllRatingByProductIdAndEStatusRating(Long productId){
        List<Rating> ratings = ratingRepository.findAllByProduct_Id(productId);
        return ratings.stream()
                .filter(rating -> rating.getERating() == ERating.APPROVED)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private RatingResDto convertToDTO(Rating rating) {
        RatingResDto dto = new RatingResDto();
        dto.setId(rating.getId());
        dto.setStar(rating.getStar());
        dto.setComment(rating.getComment());
        dto.setCreateAt(rating.getCreateAt());
        dto.setRepComment(rating.getRepComment());
        dto.setFullName(rating.getCustomer().getFullName());
        dto.setLikes(rating.getLikes());
        dto.setLiked(rating.isLiked());
        dto.setImageRatings(rating.getImageRating());
        return dto;
    }

    public LikeDto like(Long ratingId) {
        Rating rating = ratingRepository.findById(String.valueOf(ratingId))
                .orElseThrow(() -> new NoSuchElementException("Rating not found with id: " + ratingId));
        rating.setLikes(rating.getLikes() + 1);
        rating.setLiked(true);
        ratingRepository.save(rating);
        LikeDto likeDto = new LikeDto();
        likeDto.setLikes(rating.getLikes());
        likeDto.setLiked(rating.isLiked());
        return likeDto;
    }

    public LikeDto unlike(Long ratingId) {
        Rating rating = ratingRepository.findById(String.valueOf(ratingId))
                .orElseThrow(() -> new NoSuchElementException("Rating not found with id: " + ratingId));
        rating.setLikes(rating.getLikes() - 1);
        rating.setLiked(false);
        ratingRepository.save(rating);
        LikeDto likeDto = new LikeDto();
        likeDto.setLikes(rating.getLikes());
        likeDto.setLiked(rating.isLiked());

        return likeDto;
    }

    public Rating setRepComment(RepComment repComment) {
        Rating rating = ratingRepository.findById(String.valueOf(repComment.getRatingId())).get();
        rating.setRepComment((repComment.getRepComment()));
        return ratingRepository.save(rating);
    }

    public void changeStatusRating (ChangeStatusRating changeStatusRating){
        Rating rating = ratingRepository.findById(String.valueOf(changeStatusRating.getRatingId())).get();
        rating.setERating(ERating.valueOf(changeStatusRating.getStatus()));
        ratingRepository.save(rating);
    }

    public List<Rating> findAllByStatus (String status){
       List<Rating> ratings= ratingRepository.findAll();
       return ratings.stream().filter(r -> r.getERating() ==ERating.valueOf(status)).collect(Collectors.toList());
    }

    public Optional<ShowRatingDto> findByOrderId(Long orderId){
        Order od = orderService.findById(orderId).get();
        List<OrderDetail> dt =orderDetailService.getOrderDetailByOrder_Id(od.getId());
        Rating rating = ratingRepository.findByOrder_Id(od.getId()).get();
        ShowRatingDto dto = new ShowRatingDto();
        dto.setOrderDetails(dt);
        dto.setOrder(od);
        dto.setRating(rating);
        return Optional.of(dto);
    }
}
