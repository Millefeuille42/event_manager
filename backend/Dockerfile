FROM python:alpine3.15

WORKDIR /app
COPY app/requirements.txt ./
RUN pip3 install -r requirements.txt
RUN pip3 install waitress
COPY app/. ./

EXPOSE 5000
# NOT SUITABLE FOR PRODUCTION
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]