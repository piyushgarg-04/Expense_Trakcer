package com.example.expensetracker.mapper;

import com.example.expensetracker.dto.ExpenseDTO;
import com.example.expensetracker.dto.CategoryDTO;
import com.example.expensetracker.dto.VendorCategoryMappingDTO;
import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.VendorCategoryMapping;

public class Mapper {

    public static ExpenseDTO toExpenseDTO(Expense expense) {
        String categoryName = expense.getCategory() != null ? expense.getCategory().getName() : null;
        return new ExpenseDTO(
                expense.getId(),
                expense.getDate(),
                expense.getAmount(),
                expense.getVendorName(),
                expense.getDescription(),
                categoryName,
                expense.getIsAnomaly()
        );
    }

    public static CategoryDTO toCategoryDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getName());
    }

    public static VendorCategoryMappingDTO toVendorCategoryMappingDTO(VendorCategoryMapping mapping) {
        String categoryName = mapping.getCategory() != null ? mapping.getCategory().getName() : null;
        return new VendorCategoryMappingDTO(mapping.getId(), mapping.getVendorName(), categoryName);
    }
}