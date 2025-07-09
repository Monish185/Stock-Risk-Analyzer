from fastapi import Query, HTTPException
import yfinance as yf
from typing import List
from datetime import datetime
import pandas as pd

def get_multi_chart_data(tickers: List[str] = Query(...), mode: str = "return"):
    try:
        raw_df = yf.download(tickers=tickers, period="6mo", group_by='ticker', auto_adjust=False)


        close_df = pd.DataFrame({
            ticker: raw_df[ticker]["Close"] for ticker in tickers
        }).dropna()

        close_df = close_df.tail(120)

        labels = [d.strftime("%d %b") for d in close_df.index]
        result = {}

        for ticker in tickers:
            series = close_df[ticker]
            if mode == "return":
                base_price = series.iloc[0]
                data = ((series - base_price) / base_price * 100).round(2)
            else:
                data = series.round(2)

            result[ticker] = data.tolist()

        return {
            "labels": labels,
            "data": result
        }

    except Exception as e:
        print("Chart API Error:", e)
        raise HTTPException(status_code=500, detail="Chart fetch failed")
