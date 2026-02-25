package com.example.expensetracker.controller;

import com.example.expensetracker.dto.VendorMappingRequest;
import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.VendorCategoryMapping;
import com.example.expensetracker.repository.CategoryRepository;
import com.example.expensetracker.repository.VendorCategoryMappingRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/mappings")
@RequiredArgsConstructor
public class VendorMappingController {

    private final VendorCategoryMappingRepository mappingRepo;
    private final CategoryRepository categoryRepo;

    // CREATE / UPDATE mapping (Swiggy -> Food)
    @PostMapping
    public ResponseEntity<VendorCategoryMapping> createOrUpdate(@Valid @RequestBody VendorMappingRequest req) {

        Category category = categoryRepo.findById(req.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found: " + req.getCategoryId()));

        VendorCategoryMapping mapping = mappingRepo.findByVendorName(req.getVendorName())
                .orElse(new VendorCategoryMapping());

        mapping.setVendorName(req.getVendorName());
        mapping.setCategory(category);

        return ResponseEntity.ok(mappingRepo.save(mapping));
    }

    // GET ALL mappings
    @GetMapping
    public ResponseEntity<List<VendorCategoryMapping>> getAll() {
        return ResponseEntity.ok(mappingRepo.findAll());
    }

    // DELETE mapping by id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Integer id) {
        mappingRepo.deleteById(id);
        return ResponseEntity.ok("Mapping deleted");
    }
}