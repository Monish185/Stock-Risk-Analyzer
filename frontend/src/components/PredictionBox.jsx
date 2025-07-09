import axios from 'axios';
import React, { useState } from 'react';
import {Button,Paper,Typography,TextField,CircularProgress,Box} from '@mui/material'
import { useSnackbar } from '../context/SnackBarContext';

const PredictionBox = () => {

const [ticker,setTicker] = useState('')
const [result,setResult] = useState(null)
const [loading,setLoading] = useState(false)
const {showSnackbar} = useSnackbar()

const handlePredict = async () => {
    if(!ticker) return showSnackbar("Please enter a valid ticker", "warning");

    setLoading(true)

    try{
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/predict`,{
            params: {ticker}
        });

        setResult(res.data)
        showSnackbar(`Prediction loaded for ${ticker}`, "success");
    }catch(err){
        console.error(err)
        showSnackbar("❌ Prediction failed. Try again.", "error");
        setResult({error: "Failed to predict"})
    }

    setLoading(false)
}

    return ( 
        <>
        <Paper elevation={6} sx={{p:4, maxWidth:500,mx:'auto',my:8}}>
            <Typography variant='h5' align='center' gutterBottom>
                📈 Predict Stock Price
            </Typography>
        <TextField
            label="Stock Ticker"
            variant='outlined'
            fullWidth
            value={ticker}
            onChange={e => setTicker(e.target.value.toUpperCase())}
            sx={{mb:3}}
        />

        <Button variant='contained' color='primary' fullWidth onClick={handlePredict} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Predict"}
        </Button>

        {result && (
            <Box mt={4} textAlign='center'>
                {result.error? (
                    <Typography color="error">{result.error}</Typography>
                ):(
                    <>
                        <Typography variant="subtitle1" gutterBottom>
                            Predicted price for <strong>{result.ticker}</strong>:
                        </Typography>

                        <Typography variant="h4" color="success.main">
                            ${Number(result.predicted_price).toFixed(2)}
                        </Typography>
                    </>
                )}

            </Box>
        )}
        </Paper>
        </> 
    );
}

export default PredictionBox;