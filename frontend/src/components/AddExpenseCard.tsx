import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { addExpense } from "../api";

export default function AddExpenseCard() {
  const [form, setForm] = useState({ date: "", amount: "", vendorName: "", description: "" });
  const [msg, setMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      await addExpense({
        date: form.date,
        amount: Number(form.amount),
        vendorName: form.vendorName,
        description: form.description,
      });
      setMsg("✅ Expense added successfully!");
      setForm({ date: "", amount: "", vendorName: "", description: "" });
    } catch {
      setMsg("❌ Failed to add expense. Check backend/CORS.");
    }
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Add Expense
        </Typography>

        {msg && <Alert sx={{ mb: 2 }}>{msg}</Alert>}

        <form onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField fullWidth type="date" name="date" label="Date" InputLabelProps={{ shrink: true }}
                value={form.date} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth type="number" name="amount" label="Amount"
                value={form.amount} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth name="vendorName" label="Vendor"
                value={form.vendorName} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth name="description" label="Description"
                value={form.description} onChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" type="submit">Add Expense</Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}