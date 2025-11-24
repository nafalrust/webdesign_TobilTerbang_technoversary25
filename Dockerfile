FROM python:3.11-slim

WORKDIR /app

# Copy backend files
COPY ./backend ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5000

# Production settings
ENV FLASK_ENV=production
ENV PYTHONUNBUFFERED=1
ENV PORT=5000

# Use gunicorn for production
CMD gunicorn --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 60 app.main:app
