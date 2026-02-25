import React, { useEffect, useState } from "react";
import {
  Card, CardContent, Typography, Table, TableBody, TableCell,
  TableHead, TableRow, Button, Chip, Stack
} from "@mui/material";
import { deleteExpense, getAllExpenses } from "../api";

export default function ExpenseTableCard() {
  const [rows, setRows] = useState<any[]>([]);

  const load = async () => {
    const res = await getAllExpenses();
    setRows(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: number) => {
    await deleteExpense(id);
    load();
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            All Expenses
          </Typography>
          <Button variant="outlined" onClick={load}>Refresh</Button>
        </Stack>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Anomaly</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} sx={{ background: r.isAnomaly ? "#fff4f4" : "inherit" }}>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.vendorName}</TableCell>
                <TableCell>{r.amount}</TableCell>
                <TableCell>{r.category?.name || "Uncategorized"}</TableCell>
                <TableCell>
                  {r.isAnomaly ? <Chip label="Anomaly" color="error" /> : <Chip label="Normal" color="success" />}
                </TableCell>
                <TableCell>
                  <Button color="error" onClick={() => remove(r.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}