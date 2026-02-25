import React, { useState } from "react";
import { uploadCSV } from "./api";

const UploadCSV = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }
    const res = await uploadCSV(file);
    alert("Uploaded Expenses: " + res.data.length);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
};

export default UploadCSV;