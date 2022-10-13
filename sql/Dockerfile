FROM postgres
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB lumberjack
COPY lumberjack_create.sql /docker-entrypoint-initdb.d/
