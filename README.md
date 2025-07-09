# 📊 Stock Risk Analyzer & Price Predictor

An AI-powered full-stack web app to **analyze portfolio risk** and **predict future stock prices** using Deep Learning. Built with `FastAPI`, `React`, and `TensorFlow`.

![image](https://github.com/user-attachments/assets/c5001363-b18c-48eb-a24d-7537e56e766b)


![image](https://github.com/user-attachments/assets/ac5832d4-b06d-4ce8-be70-d5f78d8dc529)


![image](https://github.com/user-attachments/assets/94fcae03-ed05-46fe-912c-4e3d3ea0dacf)



---

## 🔍 Features

- 📈 **Multi-Ticker Portfolio Risk Analysis**  
  Enter multiple stock tickers and weights — get risk metrics like **Expected Return**, **Volatility**, and **Sharpe Ratio**.

- 🤖 **Stock Price Prediction**  
  Predict the next day price of a stock using LSTM-based deep learning model.

- 🌐 **Interactive Frontend**  
  Clean, responsive UI using React + Material UI.

- 🔁 **Toggle between Raw Price & % Returns** in charts

- ☁️ **Live Chart Visualization** using Chart.js

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Material UI
- Axios
- Chart.js

### Backend:
- FastAPI
- TensorFlow / Keras
- yFinance
- Scikit-Learn
- NumPy & Pandas

---
# Demo Video :- 
https://drive.google.com/file/d/1V7dXr748pkbl4-5eD0VrZocKHaJFdoOp/view?usp=sharing

---
## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Monish185/Stock-Risk-Analyzer.git
cd Stock-Risk-Analyzer

```
### 2. Backend Setup

```bash

cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Model Training
The LSTM model is trained on 120-day windows of stock closing prices fetched via yFinance, and saved using Keras.

## Made with ❤️ by Monish Mathur

📧 monishmathurt@gmail.com 

🔗 https://www.linkedin.com/in/monish-mathur-949b5a284/
