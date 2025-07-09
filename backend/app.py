import os
os.environ["CUDA_VISIBLE_DEVICES"] = ""
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"


from fastapi import FastAPI
from routes.metrics import router as metrics_router
from fastapi.middleware.cors import CORSMiddleware
from core.logger import logger

app = FastAPI(title="Stock Risk Dashboard API")



# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routes
app.include_router(metrics_router, prefix="/api/risk", tags=["Metrics"])

@app.get("/healthz")
def health():
    return {"status": "ok"}


from routes.predict import router as predict_router
app.include_router(predict_router, prefix="/api/predict", tags=["Predict"])


from routes.chart import router as chart_router
app.include_router(chart_router, prefix="/api/chart")

@app.on_event("startup")
async def show_routes():
    print("Registered routes:")
    for route in app.routes:
        print(route.path)
