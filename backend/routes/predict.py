from fastapi import APIRouter, HTTPException, Query
from services.model import predict_next_price, train_and_save_model, load_saved_model
from core.config import settings
import os
from core.logger import logger

router = APIRouter()

# Load model at startup
if not os.path.exists(settings.MODEL_PATH):
    os.makedirs(os.path.dirname(settings.MODEL_PATH), exist_ok=True)
    train_and_save_model("AAPL", model_path=settings.MODEL_PATH)

load_saved_model(settings.MODEL_PATH)

@router.get("/")
def get_prediction(ticker: str = Query(..., description="Ticker symbol like AAPL")):
    try:
        price = predict_next_price(ticker)
        return {"ticker": ticker.upper(), "predicted_price": price}
    except Exception as e:
        logger.error(f"Prediction failed for {ticker}: {e}")
        raise HTTPException(status_code=500, detail=str(e))
