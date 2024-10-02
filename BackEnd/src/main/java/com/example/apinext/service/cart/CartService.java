package com.example.apinext.service.cart;
import com.example.apinext.model.*;
import com.example.apinext.model.DTO.AddCart;
import com.example.apinext.model.DTO.CartDTO;
import com.example.apinext.repository.ICartRepository;
import com.example.apinext.service.color.ColorService;
import com.example.apinext.service.customer.CustomerService;
import com.example.apinext.service.images.ImagesService;
import com.example.apinext.service.product.ProductService;
import com.example.apinext.util.DateUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class CartService implements ICartService{
    @Autowired
    private ICartRepository cartRepository;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private ProductService productService;
    @Autowired
    private ColorService colorService;
    @Autowired
    private ImagesService imagesService;

    @Override
    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    @Override
    public Optional<Cart> findById(Long id) {
        return cartRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(Cart cart) {
    cartRepository.save(cart);
    }

    @Override
    public void deleteById(Long id) {
    cartRepository.deleteById(String.valueOf(id));
    }

    public void createCart(CartDTO cartDTO) {
        Customer customer = customerService.findById(cartDTO.getCustomerId()).orElse(null);
        Product product = productService.findById(cartDTO.getProductId()).orElse(null);
//        Cart existingCart = cartRepository.findByCustomerAndProduct(customer, product);
//        if (existingCart != null) {
//            existingCart.setQuantity(existingCart.getQuantity() + 1);
//            cartRepository.save(existingCart);
//        } else {
//            Cart cart = new Cart();
//            cart.setCustomer(customer);
//            cart.setDate(DateUtils.convertStringToLocalDate(cartDTO.getDate()));
//            cart.setProduct(product);
//            cart.setQuantity(1);
//            cartRepository.save(cart);
//        }
    }

    @Override
    public Cart findByCustomerAndProduct(Customer customer, Product product) {
//        return cartRepository.findByCustomerAndProduct(customer, product);
        return null;
    }

    @Override
    public List<Cart> getCartCustomerId(Long customerId) {
        return cartRepository.findAllByCustomer_Id(customerId);
    }

    @Override
    public List<Cart> deleteAllByCustomer_Id(Long customer_id) {
        return cartRepository.deleteAllByCustomer_Id(customer_id);
    }

    public Cart addToCart(AddCart addCart){
        Customer customer = customerService.findById(addCart.getCustomerId()).get();
        Product product = productService.findById(addCart.getProductId()).get();
        Color color = colorService.findById(addCart.getColor()).get();
        Images images =imagesService.findById(addCart.getColor()).get();
        Cart existingCart = cartRepository.findByCustomerAndProductAndColor(customer, product,color);
        if (existingCart != null) {
            if((existingCart.getQuantity() + addCart.getQuantity()) > existingCart.getImage().getStock().getQuantity()){
               return null;
            }
            else{
                existingCart.setQuantity(existingCart.getQuantity() + addCart.getQuantity());
                cartRepository.save(existingCart);
                return existingCart;
            }
        }
            Cart cart = new Cart();
            cart.setCustomer(customer);
            cart.setDate(DateUtils.convertStringToLocalDate(addCart.getDate()));
            cart.setProduct(product);
            cart.setQuantity(addCart.getQuantity());
            cart.setColor(color);
            cart.setSize(addCart.getSize());
            cart.setImage(images);
            cartRepository.save(cart);
            return cart;
        }

}
