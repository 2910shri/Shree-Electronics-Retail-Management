package com.ShreeElectronics.repository;
import com.ShreeElectronics.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
public interface OrderRepository extends JpaRepository<Orders, Long> {}
