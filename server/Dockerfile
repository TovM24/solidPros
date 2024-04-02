FROM python:3.12.2

RUN pip install Flask opencv-python pytesseract gunicorn

COPY public/ app/
WORKDIR /app

ENV PORT 8080 

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app