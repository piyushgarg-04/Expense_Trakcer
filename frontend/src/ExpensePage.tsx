import React, { useState } from "react";
import { Tabs, Tab, Box, Paper } from "@mui/material";
import AddExpenseCard from "./components/AddExpenseCard";
import UploadCsvCard from "./components/UploadCsvCard";
import DashboardCard from "./components/DashboardCard";
import ExpenseTableCard from "./components/ExpenseTableCard";

export default function ExpensePage() {
  const [tab, setTab] = useState(0);

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Add Expense" />
        <Tab label="Upload CSV" />
        <Tab label="Dashboard" />
        <Tab label="All Expenses" />
      </Tabs>

      <Box hidden={tab !== 0}><AddExpenseCard /></Box>
      <Box hidden={tab !== 1}><UploadCsvCard /></Box>
      <Box hidden={tab !== 2}><DashboardCard /></Box>
      <Box hidden={tab !== 3}><ExpenseTableCard /></Box>
    </Paper>
  );
}