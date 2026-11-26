package com.ShreeElectronics.service;

import com.ShreeElectronics.dto.CheckoutRequest;
import com.ShreeElectronics.entity.Cart;
import com.ShreeElectronics.model.OrderItem;
import com.ShreeElectronics.model.Orders;
import com.ShreeElectronics.model.Product;
import com.ShreeElectronics.repository.CartRepository;
import com.ShreeElectronics.repository.OrderRepository;
import com.ShreeElectronics.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service @RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final CartRepository cartRepo;
    private final EmailService emailService;

    @Transactional
    public Orders checkout(CheckoutRequest request) {
        if (!"COD".equalsIgnoreCase(request.paymentMethod()) && !"UPI".equalsIgnoreCase(request.paymentMethod()))
            throw new IllegalArgumentException("Unsupported payment method");
        Orders order = new Orders();
        order.setCustomerName(request.customerName()); order.setCustomerEmail(request.customerEmail());
        order.setMobile(request.mobile()); order.setAddressLine(request.addressLine());
        order.setCity(request.city()); order.setPincode(request.pincode()); order.setPaymentMethod(request.paymentMethod());
        double total = 0;
        for (CheckoutRequest.CheckoutItem requested : request.items()) {
            Product product = productRepo.findById(requested.productId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found: " + requested.productId()));
            if (product.getStock() == null || product.getStock() < requested.quantity())
                throw new IllegalArgumentException("Insufficient stock for " + product.getName());
            double unitPrice = product.getPrice();
            product.setStock(product.getStock() - requested.quantity());
            OrderItem item = new OrderItem(); item.setProductId(product.getId()); item.setProductName(product.getName());
            item.setQuantity(requested.quantity()); item.setUnitPrice(unitPrice); order.addItem(item);
            total += unitPrice * requested.quantity();
        }
        order.setTotalPrice(total);
        Orders saved = orderRepo.save(order);
        cartRepo.deleteAll();
        emailService.sendOrderConfirmation(saved.getCustomerEmail(), saved.getCustomerName(), saved.getId().toString());
        return saved;
    }

    public List<Orders> getAllOrders() { return orderRepo.findAll(); }
}
