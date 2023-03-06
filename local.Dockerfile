FROM mysql:latest
COPY ./docker/todo_database.sql /docker-entrypoint-initdb.d/
