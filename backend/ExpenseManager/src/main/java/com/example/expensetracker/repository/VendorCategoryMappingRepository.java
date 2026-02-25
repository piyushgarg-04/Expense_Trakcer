package com.example.expensetracker.repository;

import com.example.expensetracker.entity.VendorCategoryMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VendorCategoryMappingRepository extends JpaRepository<VendorCategoryMapping, Integer> {
    Optional<VendorCategoryMapping> findByVendorName(String vendorName);
}