import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ExpensePage from "./ExpensePage";

export default function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700}>
        Expense Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Add expenses, upload CSV, view dashboard summary, and track anomalies.
      </Typography>

      <Box>
        <ExpensePage />
      </Box>
    </Container>
  );
}