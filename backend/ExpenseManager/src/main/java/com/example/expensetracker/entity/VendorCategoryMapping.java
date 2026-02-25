package com.example.expensetracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vendor_category_mapping")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorCategoryMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String vendorName;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}