import React, { useState } from "react";
import { addExpense } from "./api";

const AddExpense = () => {
  const [form, setForm] = useState({
    date: "",
    amount: 0,
    vendorName: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addExpense(form);
    alert("Expense Added: " + JSON.stringify(res.data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" name="date" onChange={handleChange} required />
      <input type="number" name="amount" onChange={handleChange} placeholder="Amount" required />
      <input type="text" name="vendorName" onChange={handleChange} placeholder="Vendor Name" required />
      <input type="text" name="description" onChange={handleChange} placeholder="Description" />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;