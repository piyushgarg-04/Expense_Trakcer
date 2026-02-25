package com.example.expensetracker.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDTO {
    private Integer id;
    private LocalDate date;
    private Double amount;
    private String vendorName;
    private String description;
    private String categoryName;
    private Boolean isAnomaly;
}