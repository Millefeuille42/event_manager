FROM redis:7-alpine

ARG REDIS_PASSWORD
ENV redis_password $REDIS_PASSWORD

COPY conf/redis.conf /usr/local/etc/redis/redis.conf
RUN sed -i "s/{redis_password}/$redis_password/g" /usr/local/etc/redis/redis.conf
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]