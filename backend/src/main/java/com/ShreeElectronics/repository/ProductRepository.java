package com.ShreeElectronics.repository;

import com.ShreeElectronics.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}