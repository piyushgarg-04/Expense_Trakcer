package com.example.expensetracker.service;

import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.entity.VendorCategoryMapping;
import com.example.expensetracker.repository.CategoryRepository;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.repository.VendorCategoryMappingRepository;
import com.opencsv.CSVReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepo;

    @Autowired
    private VendorCategoryMappingRepository mappingRepo;

    @Autowired
    private CategoryRepository categoryRepo;

    // ------------------- CRUD Operations -------------------

    public Expense addExpense(Expense expense) {
        // Assign category based on vendor
        Optional<VendorCategoryMapping> mapping = mappingRepo.findByVendorName(expense.getVendorName());
        mapping.ifPresentOrElse(
                m -> expense.setCategory(m.getCategory()),
                () -> expense.setCategory(null)
        );

        // Check anomaly: amount > 3x avg of category
        if (expense.getCategory() != null) {
            List<Expense> categoryExpenses = expenseRepo.findByCategory(expense.getCategory());
            double avg = categoryExpenses.stream()
                    .mapToDouble(Expense::getAmount)
                    .average()
                    .orElse(0);
            if (expense.getAmount() > 3 * avg) {
                expense.setIsAnomaly(true);
            }
        }

        return expenseRepo.save(expense);
    }

    public Expense getExpenseById(Integer id) {
        return expenseRepo.findById(id).orElse(null);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepo.findAll();
    }

    public Expense updateExpense(Integer id, Expense updatedExpense) {
        return expenseRepo.findById(id).map(expense -> {
            expense.setDate(updatedExpense.getDate());
            expense.setAmount(updatedExpense.getAmount());
            expense.setVendorName(updatedExpense.getVendorName());
            expense.setDescription(updatedExpense.getDescription());
            // Recompute category and anomaly
            return addExpense(expense);
        }).orElse(null);
    }

    public boolean deleteExpense(Integer id) {
        if (expenseRepo.existsById(id)) {
            expenseRepo.deleteById(id);
            return true;
        }
        return false;
    }

    // ------------------- CSV Upload -------------------

    public List<Expense> uploadExpenses(MultipartFile file) throws Exception {
        List<Expense> expenses = new ArrayList<>();
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            String[] line;
            reader.readNext(); // skip header
            while ((line = reader.readNext()) != null) {
                Expense expense = new Expense();
                expense.setDate(LocalDate.parse(line[0]));
                expense.setAmount(Double.parseDouble(line[1]));
                expense.setVendorName(line[2]);
                expense.setDescription(line[3]);
                addExpense(expense);
                expenses.add(expense);
            }
        }
        return expenses;
    }

    // ------------------- Dashboard Summary -------------------

    public Map<String, Object> getDashboardSummary() {
        Map<String, Object> summary = new HashMap<>();

        List<Expense> all = expenseRepo.findAll();

        // Monthly totals per category (null-safe amount + category)
        Map<String, Double> monthlyTotals = all.stream()
                .filter(e -> e.getAmount() != null) // avoid NPE
                .collect(Collectors.groupingBy(
                        e -> (e.getCategory() != null && e.getCategory().getName() != null)
                                ? e.getCategory().getName()
                                : "Uncategorized",
                        Collectors.summingDouble(Expense::getAmount)
                ));
        summary.put("monthlyTotals", monthlyTotals);

        // Top 5 vendors (null-safe vendor + amount)
        Map<String, Double> vendorTotals = all.stream()
                .filter(e -> e.getAmount() != null)
                .collect(Collectors.groupingBy(
                        e -> (e.getVendorName() != null && !e.getVendorName().isBlank())
                                ? e.getVendorName()
                                : "Unknown Vendor",
                        Collectors.summingDouble(Expense::getAmount)
                ));

        summary.put("topVendors", vendorTotals.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(5)
                .toList()
        );

        // Anomalies (null-safe Boolean)
        List<Expense> anomalies = all.stream()
                .filter(e -> Boolean.TRUE.equals(e.getIsAnomaly()))
                .toList();
        summary.put("anomalies", anomalies);

        return summary;
    }
}