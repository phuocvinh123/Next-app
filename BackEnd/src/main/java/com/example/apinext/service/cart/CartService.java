package com.example.apinext.service.cart;

import com.example.apinext.model.Cart;
import com.example.apinext.model.DTO.CartDTO;
import com.example.apinext.model.Product;
import com.example.apinext.model.User;
import com.example.apinext.repository.ICartRepository;
import com.example.apinext.repository.IProductRepository;
import com.example.apinext.repository.IUserRepository;
import com.example.apinext.service.product.ProductService;
import com.example.apinext.service.user.UserService;
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
    private UserService userService;
    @Autowired
    private ProductService productService;
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
        User user = userService.findById(cartDTO.getUserId()).orElse(null);
        Product product = productService.findById(cartDTO.getProductId()).orElse(null);
        Cart existingCart = cartRepository.findByUserAndProduct(user, product);
        if (existingCart != null) {
            existingCart.setQuantity(existingCart.getQuantity() + 1);
            cartRepository.save(existingCart);
        } else {
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setDate(DateUtils.convertStringToLocalDate(cartDTO.getDate()));
            cart.setProduct(product);
            cart.setQuantity(1);
            cartRepository.save(cart);
        }
    }

    @Override
    public Cart findByUserAndProduct(User user, Product product) {
        return cartRepository.findByUserAndProduct(user, product);
    }

    @Override
    public List<Cart> getCartUserId(Long userId) {

        return cartRepository.findAllByUser_Id(userId);
    }

    @Override
    public List<Cart> deleteAllByUser_Id(Long user_id) {
        return cartRepository.deleteAllByUser_Id(user_id);
    }
}
