import numpy as np
import pandas as pd
import yfinance as yf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
import os
import pickle

model = None
scaler = None

def fetch_stock_data(ticker: str, start: str = "2023-01-01") -> pd.DataFrame:
    df = yf.download(ticker, start=start)["Close"]

    if isinstance(df, pd.Series):
        df = df.to_frame(name="Close")

    return df

def preprocess_data(df, window_size=60):
    global scaler
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(df)

    X, y = [], []
    for i in range(window_size, len(scaled_data)):
        X.append(scaled_data[i-window_size:i])
        y.append(scaled_data[i])

    X = np.array(X)
    y = np.array(y)

    return X, y

def build_model(input_shape):
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=input_shape))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mse')
    return model

def train_and_save_model(ticker: str, model_path: str = "model/model.keras"):
    df = fetch_stock_data(ticker)
    X, y = preprocess_data(df)

    m = build_model((X.shape[1], 1))
    m.fit(X, y, epochs=10, batch_size=32, verbose=1)

    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    m.save(model_path)

    with open("model/scaler.pkl","wb") as f:
        pickle.dump(scaler,f)

def load_saved_model(model_path: str):
    global model,scaler
    model = load_model(model_path)
    with open("model/scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
    return model

def predict_next_price(ticker: str):
    df = fetch_stock_data(ticker)
    X, y = preprocess_data(df)
    model = build_model((X.shape[1], 1))
    model.fit(X, y, epochs=3, batch_size=32, verbose=0)

    # Predict next day
    last_60 = df[-60:]
    scaled = scaler.transform(last_60)
    X_input = np.array([scaled])
    pred_scaled = model.predict(X_input)
    pred = scaler.inverse_transform(pred_scaled)
    return round(float(pred[0][0]), 2)

