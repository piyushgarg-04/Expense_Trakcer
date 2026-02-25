import React, { useState } from "react";
import {
  Card, CardContent, Typography, Button, Alert, Stack
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { uploadCSV } from "../api";

export default function UploadCsvCard() {
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const upload = async () => {
    setMsg(null);
    if (!file) {
      setMsg("❌ Please select a CSV file first.");
      return;
    }
    try {
      const res = await uploadCSV(file);
      setMsg(`✅ Uploaded ${res.data.length} expenses.`);
      setFile(null);
    } catch {
      setMsg("❌ Upload failed. Check CSV format & backend.");
    }
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Upload CSV
        </Typography>

        {msg && <Alert sx={{ mb: 2 }}>{msg}</Alert>}

        <Stack direction="row" spacing={2} alignItems="center">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            onClick={upload}
          >
            Upload
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          CSV format: date,amount,vendorName,description
        </Typography>
      </CardContent>
    </Card>
  );
}