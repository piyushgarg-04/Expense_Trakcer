import React, { useEffect, useState } from "react";
import { getDashboard } from "./api";

const Dashboard = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    getDashboard().then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Monthly Totals</h2>
      <pre>{JSON.stringify(data.monthlyTotals, null, 2)}</pre>

      <h2>Top Vendors</h2>
      <pre>{JSON.stringify(data.topVendors, null, 2)}</pre>

      <h2>Anomalies</h2>
      <pre>{JSON.stringify(data.anomalies, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;