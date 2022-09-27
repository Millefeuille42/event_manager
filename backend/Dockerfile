FROM python:alpine3.15

WORKDIR /app
COPY server/requirements.txt ./
RUN pip3 install -r requirements.txt
RUN pip3 install waitress
COPY server ./server

EXPOSE 5000
# NOT SUITABLE FOR PRODUCTION

ENV PYTHONUNBUFFERED True

CMD ["gunicorn", "--preload", "-w 4", "-b", "0.0.0.0:5000", "server:app"]
#CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]