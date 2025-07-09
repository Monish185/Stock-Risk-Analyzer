import React, { useState,useEffect } from 'react';
import {Typography,TextField,Box,Paper,Grid,Button} from '@mui/material'
import axios from 'axios';
import { useSnackbar } from '../context/SnackBarContext';
import PriceChart from './PriceChart';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import {Autocomplete} from '@mui/material';


const RiskForm = ({onResult}) => {
    const [tickers,setTickers] = useState([''])
    const [weights,setWeights] = useState([''])
    const {showSnackbar } = useSnackbar()
    const [showChart, setShowChart] = useState(false);
    const [chartMode, setChartMode] = useState("return");


    useEffect(() => {
        const savedMode = localStorage.getItem("chartMode");
        if (savedMode) setChartMode(savedMode);
    }, []);

    useEffect(() => {
        localStorage.setItem("chartMode", chartMode);
    }, [chartMode]);


    const handleSubmit = async () => {
        if (tickers.length !== weights.length || tickers.some(t => !t)) {
            return showSnackbar("Tickers and weights must match", "warning");
        }
        const totalWeight = weights.reduce((acc, w) => acc + parseFloat(w || 0), 0);
        if (Math.abs(totalWeight - 1) > 0.01) {
        return showSnackbar("Weights must sum to 1.0", "warning");
        }


        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/risk/`, {
            tickers,
            weights: weights.map(w => parseFloat(w))
            });
            onResult(res.data);
            showSnackbar("Risk calculated ✅", "success");
            setShowChart(true);  
        } catch (err) {
            console.error(err);
            showSnackbar("❌ Risk calculation failed", "error");
            setShowChart(false);
        }
    };


    const handleTickerChange = (index,value) => {
        const updated = [...tickers];
        updated[index] = value.toUpperCase()
        setTickers(updated);
    }

    const handleWeightChange = (index, value) => {
    const updated = [...weights];
    updated[index] = value;
    setWeights(updated);
  };

  const addField = () => {
    setTickers([...tickers, '']);
    setWeights([...weights, '']);
  };

  return(
    <>
        <Paper elevation={6} sx={{p: 4, maxWidth: 600, mx: 'auto', my: 4}}>
            <Typography variant='h5' align='center' gutterBottom>
                📊 Portfolio Risk Analyzer
            </Typography>

            {tickers.map((_,i)=>(
                <Grid container spacing={2} key={i} sx={{mb:2}}>
                    <Grid item xs={6}>
                        
                    <Autocomplete
                    freeSolo
                    options={["AAPL", "TSLA", "MSFT", "GOOGL", "AMZN", "META", "NVDA", "NFLX", "ADBE", "INTC"]}
                    value={tickers[i]}
                    onChange={(e, val) => handleTickerChange(i, val || '')}
                    onInputChange={(e, val) => handleTickerChange(i, val)}
                    renderInput={(params) => (
                        <TextField {...params} label={`Ticker ${i + 1}`} fullWidth />
                    )}
                    />

                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label={`Weight ${i + 1}`}
                            fullWidth
                            type="number"
                            value={weights[i]}
                            onChange={(e) => handleWeightChange(i, e.target.value)}
                        />
                    </Grid>

                </Grid>
            ))}

            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button onClick={addField} variant="outlined">➕ Add Stock</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Analyze
                </Button>
            </Box>
            <ToggleButtonGroup
                value={chartMode}
                exclusive
                onChange={(e, val) => val && setChartMode(val)}
                sx={{ my: 2 }}
            >
                <ToggleButton value="return">📈 % Return</ToggleButton>
                <ToggleButton value="price">💵 Price</ToggleButton>
            </ToggleButtonGroup>

            {showChart && <PriceChart tickers={tickers} mode={chartMode} />}

            <Button onClick={() => {
                setTickers(['']);
                setWeights(['']);
                onResult(null);
                setShowChart(false);
                setChartMode("return");

            }}>
  Reset
</Button>

        </Paper>
    </>
  )
}

export default RiskForm;