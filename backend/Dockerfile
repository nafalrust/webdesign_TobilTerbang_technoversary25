FROM python:3.11-slim

WORKDIR /app

# Install system dependencies (git for HF Spaces, libGL for OpenCV)
RUN apt-get update && apt-get install -y \
    git \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 7860

# Set environment
ENV PORT=7860

# Run application
CMD ["python", "app/main.py"]
