from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    MODEL_PATH: str = os.getenv("MODEL_PATH","model/model.keras")
    RISK_FREE_RATE: float = float(os.getenv("RISK_FREE_RATE",0.02))

settings = Settings()