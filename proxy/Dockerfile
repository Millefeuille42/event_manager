FROM nginx:stable-alpine
ARG SSL_KEY
ARG SSL_CERT

EXPOSE 443

ENV ssl_key $SSL_KEY
ENV ssl_cert $SSL_CERT

COPY $ssl_cert /.keys/fullchain.pem
COPY $ssl_key /.keys/privkey.pem 
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
