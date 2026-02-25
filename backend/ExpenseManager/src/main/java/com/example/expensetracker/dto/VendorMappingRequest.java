package com.example.expensetracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VendorMappingRequest {

    @NotBlank
    private String vendorName;

    @NotNull
    private Integer categoryId;
}