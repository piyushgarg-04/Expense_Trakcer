import axios from "axios";

export const API_BASE = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE,
});

export type ExpensePayload = {
  date: string;
  amount: number;
  vendorName: string;
  description?: string;
};

export const addExpense = (expense: ExpensePayload) =>
  api.post("/api/expenses", expense);

export const getAllExpenses = () =>
  api.get("/api/expenses");

export const deleteExpense = (id: number) =>
  api.delete(`/api/expenses/${id}`);

export const updateExpense = (id: number, expense: ExpensePayload) =>
  api.put(`/api/expenses/${id}`, expense);

export const uploadCSV = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/api/expenses/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getDashboard = () =>
  api.get("/api/expenses/dashboard");