package com.ShreeElectronics.service;

import com.ShreeElectronics.model.Product;
import com.ShreeElectronics.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    @Mock ProductRepository repository;
    @InjectMocks ProductService service;

    @Test void lowStockReturnsProductsAtOrBelowThreshold() {
        Product low = new Product("Mouse", "Accessories", 499.0, 3);
        Product healthy = new Product("Keyboard", "Accessories", 999.0, 20);
        when(repository.findAll()).thenReturn(List.of(low, healthy));
        assertEquals(List.of(low), service.getLowStockProducts(5));
    }

    @Test void addProductRejectsNegativeStock() {
        Product invalid = new Product("Mouse", "Accessories", 499.0, -1);
        assertThrows(IllegalArgumentException.class, () -> service.addProduct(invalid));
        verify(repository, never()).save(any());
    }
}
