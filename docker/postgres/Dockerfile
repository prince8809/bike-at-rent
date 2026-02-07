FROM postgres:15

# Default DB credentials (can be overridden via environment variables in docker-compose or .env)
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=bike_at_rent

# Copy SQL migrations (only .up.sql will be executed by the official image during init)
COPY ../../migrations/*.up.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

# Use the default postgres entrypoint which will initialize DB and run scripts
