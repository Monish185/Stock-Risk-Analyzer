# Use compatible base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy code
COPY . /app

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose port
EXPOSE 10000

# Run the app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "10000"]
