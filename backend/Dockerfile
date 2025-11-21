FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 5000

# Run with auto-reload (development mode)
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1

CMD ["python", "app/main.py"]
