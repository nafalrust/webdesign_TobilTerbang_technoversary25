FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port (Railway will automatically set PORT)
EXPOSE 5000

# Production settings
ENV FLASK_ENV=production
ENV PYTHONUNBUFFERED=1

# Use gunicorn for production
CMD gunicorn --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 60 app.main:app
