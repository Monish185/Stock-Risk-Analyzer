import yfinance as yf
import numpy as np
import pandas as pd
from core.config import settings

def fetch_price_data(tickers: list[str], start: str = "2023-01-01") -> pd.DataFrame:
    raw = yf.download(tickers, start=start, group_by="ticker", auto_adjust=False)

    print("==== RAW DATA ====")
    print(raw.head())
    print("Columns:", raw.columns)

    try:
        # Filter only the 'Adj Close' prices from the multi-index columns
        if isinstance(raw.columns, pd.MultiIndex):
            df = raw.xs('Adj Close', axis=1, level=1)  # 👈 This line extracts the correct columns
        else:
            df = raw["Adj Close"]

        if df.empty:
            raise ValueError("No adjusted close prices found.")

        return df

    except Exception as e:
        print("❌ Exception occurred:", e)
        raise ValueError("Could not fetch adjusted close prices. Check ticker symbols.")





def calculate_metrics(df:  pd.DataFrame,weights: list[float]) -> dict:
    df = df.fillna(method='ffill').dropna()
    returns = df.pct_change().dropna()
    port_returns = returns.dot(weights)

    ann_return = np.mean(port_returns) * 252
    ann_vol = np.std(port_returns) * np.sqrt(252)
    sharpe = (ann_return - settings.RISK_FREE_RATE) / ann_vol if ann_vol != 0 else 0

    return {
        "annual_return": round(ann_return, 4),
        "annual_volatility": round(ann_vol, 4),
        "sharpe_ratio": round(sharpe, 4)
    }