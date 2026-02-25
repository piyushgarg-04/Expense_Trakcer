# Expense Manager Application:
A full-stack Expense Management system built using Spring Boot (Backend) and React + TypeScript (Frontend).
The application allows users to add expenses, upload CSV files, auto-categorize vendors, detect anomalies, and view dashboard summaries.

# Technologies Used:
# Backend:
Java 17, Spring Boot, Spring Data JPA, Hibernate, Maven, REST APIs

# Frontend:
React (TypeScript), Axios (API integration), Material UI (UI components)

# Database:
MySQL

# Tools:
Postman(API Testing)
Git & Github

# Setup Instructions:
Follow the steps below to run the project locally.

# 1. Prerequisites:
Make sure the following are installed:
Java 17+
Maven
Node.js (v18 or above recommended)
MySQL Server
Git

# 2. Database Setup
1. Open MySQL
2. Create a new database:
   create database expense_tracker;
3. Open backend application.properties file and update:
   spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   spring.jpa.hibernate.ddl-auto=update

# 3. Backend Setup(Spring Boot)
1. Navigate to the backend folder:
   cd backend

2. Build the project:
   mvn clean install

3. Run the application:
   mvn spring-boot: run

Backend will start at:
http://localhost:8080

# 4. Frontend Setup(React + TypeScript)
1. Navigate to the frontend:
   cd frontend

2. Install dependencies:
   npm install

3. Start the React app:
   npm start

Frontend will run at:
http://localhost:3001
   
# Quick Testing Steps:
1. Start MySQL.
2. Run backend (mvn spring-boot: run).
3. Run frontend (npm start).
4. Add vendor-category mapping (if required).
5. Add expenses manually or via CSV.
6. View dashboard summary.
7. Verify anomaly detection.

# Assumptions Made:
1. Vendor-to-category mapping must exist for automatic categorization.
2. If vendor mapping is not found, the expense is stored as “Uncategorized”.
3. Anomaly detection is calculated at insertion time using the Anomaly detection is calculated at insertion time using existing category average. existing category average.
4. An expense is marked as an anomaly if its amount exceeds 3× the average amount of its category.
5. CSV file must contain headers: date, amount, vendorName, description.
