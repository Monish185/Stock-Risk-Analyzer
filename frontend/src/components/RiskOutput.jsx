import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';

const RiskOutput = ({ data }) => {
  if (!data || data.error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {data?.error || "No data available"}
      </Typography>
    );
  }

  const metrics = data.metrics || {};

  return (
    <Paper elevation={6} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        📉 Portfolio Risk Metrics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Typography>Annual Return:</Typography>
            <Typography variant="h5" color="success.main">
              {metrics.annual_return !== undefined ? `${(metrics.annual_return * 100).toFixed(2)}%` : "N/A"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography>Volatility:</Typography>
            <Typography variant="h5" color="warning.main">
              {metrics.annual_volatility !== undefined ? `${(metrics.annual_volatility * 100).toFixed(2)}%` : "N/A"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography>Sharpe Ratio:</Typography>
            <Typography variant="h5" color="info.main">
              {metrics.sharpe_ratio !== undefined ? metrics.sharpe_ratio.toFixed(2) : "N/A"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};


export default RiskOutput;
