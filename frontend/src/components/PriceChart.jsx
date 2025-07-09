import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';
import {
  Paper, Typography, Box, ToggleButton, ToggleButtonGroup, CircularProgress
} from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const PriceChart = ({ tickers = ["AAPL", "TSLA"], mode = "return" }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchChart = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      tickers.forEach(t => params.append("tickers", t));
      params.append("mode", mode);

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/chart?${params.toString()}`);

      console.log("Chart response:", res.data);
      
      if (!res.data || !res.data.data || !res.data.labels) {
        throw new Error("Invalid response format from chart API");
      }

      

      const { labels, data } = res.data;

      const datasets = Object.entries(data).map(([ticker, values], i) => ({
        label: `${ticker} ${mode === "return" ? "% Return" : "Price"}`,
        data: values,
        borderColor: ["#0D47A1", "#C62828", "#2E7D32", "#FF8F00"][i % 4],
        backgroundColor: "rgba(0,0,0,0.05)",
        fill: true,
        tension: 0.4
      }));

      setChartData({ labels, datasets });
    } catch (err) {
      console.error("Chart fetch failed:", err);
      setError("❌ Failed to load chart data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChart();
  }, [tickers, mode]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  if (!chartData) return null;

  return (
    <Paper elevation={6} sx={{ p: 4, maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" align="center" gutterBottom>
        📈 Multi-Ticker Chart ({mode === "return" ? "% Return" : "Price"})
      </Typography>

      <Line 
        data={chartData} 
        options={{
          animation: {
            duration: 1000,
            easing: 'easeOutQuart'
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }}
      />
    </Paper>
  );
};

export default PriceChart;
