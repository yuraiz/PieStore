FROM python:3.10.2-alpine
WORKDIR /app
COPY requirements.txt ./
RUN pip install --upgrade pip setuptools wheel
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD [ "./manage.py", "runserver", "0.0.0.0:8000"]
