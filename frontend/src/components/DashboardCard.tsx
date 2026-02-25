import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Paper, CircularProgress, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getDashboard } from "../api";

export default function DashboardCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Dashboard Summary
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography fontWeight={700}>Monthly Totals</Typography>
              <pre style={{ margin: 0 }}>{JSON.stringify(data?.monthlyTotals || {}, null, 2)}</pre>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography fontWeight={700}>Top Vendors</Typography>
              <pre style={{ margin: 0 }}>{JSON.stringify(data?.topVendors || [], null, 2)}</pre>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography fontWeight={700}>Anomalies</Typography>
              <pre style={{ margin: 0 }}>{JSON.stringify(data?.anomalies || [], null, 2)}</pre>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}