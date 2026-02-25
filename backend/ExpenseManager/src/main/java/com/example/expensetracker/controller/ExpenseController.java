package com.example.expensetracker.controller;

import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // ------------------- CRUD Endpoints -------------------

    @PostMapping
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.addExpense(expense));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(expenseService.getExpenseById(id));
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> update(@PathVariable("id") Integer id,@RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.updateExpense(id, expense));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable("id") Integer id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.ok("Deleted Successfully");
    }
    // ------------------- CSV Upload -------------------

    @PostMapping("/upload")
    public ResponseEntity<List<Expense>> uploadCsv(@RequestParam("file") MultipartFile file) throws Exception {
        return ResponseEntity.ok(expenseService.uploadExpenses(file));
    }

    // ------------------- Dashboard -------------------

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(expenseService.getDashboardSummary());
    }
}