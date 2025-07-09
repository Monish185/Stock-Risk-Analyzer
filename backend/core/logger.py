import logging

log_format = '%(asctime)s | %(levelname)s | %(name)s | %(message)s'

logging.basicConfig(
    level = logging.INFO,
    format = log_format,
    handlers = [logging.StreamHandler()]
)

logger = logging.getLogger("stock-risk-backend")