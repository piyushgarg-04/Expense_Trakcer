# Short Design Note:
Rule-based categorization is implemented using a VendorCategoryMapping table that maps each vendor name to a predefined category.
When a new expense is created (manually or via CSV upload), the service layer checks this mapping and automatically assigns the corresponding category.
If no vendor mapping is found, the expense is stored as “Uncategorized” to avoid blocking the transaction process.
Anomaly detection is performed at insertion time by calculating the average expense amount for the assigned category using existing records.
If the new expense amount exceeds 3× the category average, it is flagged as an anomaly using an isAnomaly boolean field.
The data model is normalized, where Expense has a Many-to-One relationship with Category.
The VendorCategoryMapping table also references Category to maintain referential integrity and avoid duplication.
As a trade-off, anomaly detection uses a simple real-time database average instead of optimized or cached aggregation logic for simplicity and readability.
