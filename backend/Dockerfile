FROM python:3.11-slim

WORKDIR /app

# Install minimal system dependencies (git for HF Spaces, libjpeg for Pillow)
RUN apt-get update && apt-get install -y \
    git \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
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
