
FROM python:3.12

WORKDIR /usr/src/app

COPY ./requirements.txt ./

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./conversations/app ./app

CMD ["python", "-m", "app.main", "--reload"]
