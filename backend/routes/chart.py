from fastapi import APIRouter, Query
from typing import List
from services.chart import get_multi_chart_data

router = APIRouter()

@router.get('/')
def get_chart_data(tickers: List[str] = Query(...), mode: str = "return"):
    try:
        return get_multi_chart_data(tickers, mode)
    except Exception as e:
        return {"error": str(e)}
