FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code
RUN pip install --upgrade pip

COPY . .
RUN pip install -r requirements.txt

ENV PYTHONPATH "${PYTHONPATH}:/"

RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
