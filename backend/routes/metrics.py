from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, conlist
from services.metrics import fetch_price_data, calculate_metrics
import numpy as np
import pandas as pd
import traceback

class MetricRequest(BaseModel):
    tickers: conlist(str, min_length=1)
    weights: conlist(float, min_length=1)

router = APIRouter()

@router.post("/")
def get_metrics(data: MetricRequest):
    try:
        if len(data.tickers) != len(data.weights):
            raise HTTPException(status_code=400, detail="Tickers and weights length mismatch")
        if not np.isclose(sum(data.weights), 1.0):
            raise HTTPException(status_code=400, detail="Weights must sum to 1")

        print("TICKERS:", data.tickers)
        print("WEIGHTS:", data.weights) 

        df = fetch_price_data(data.tickers)
        print("Downloaded DataFrame:\n", df.head())
        metrics = calculate_metrics(df, data.weights)
        return {"metrics": metrics}
    except Exception as e:
        print("❌ Exception occurred:", str(e))
        traceback.print_exc()
        raise HTTPException(status_code=500, detail='error in get_metrics'+str(e))
