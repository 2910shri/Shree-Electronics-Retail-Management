package com.ShreeElectronics.controller;
import com.ShreeElectronics.dto.CheckoutRequest;
import com.ShreeElectronics.model.Orders;
import com.ShreeElectronics.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/orders") @CrossOrigin(origins="http://localhost:3000") @RequiredArgsConstructor
public class OrderController {
 private final OrderService service;
 @PostMapping public Orders create(@Valid @RequestBody CheckoutRequest request) { return service.checkout(request); }
 @GetMapping public List<Orders> getAllOrders() { return service.getAllOrders(); }
}
