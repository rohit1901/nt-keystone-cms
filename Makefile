COMPOSE := docker compose -f docker-compose.postgres.yml

.PHONY: container up down logs psql status clean

container: up

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f db

psql:
	$(COMPOSE) exec db sh -c 'psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"'

status:
	$(COMPOSE) ps

# DESTRUCTIVE: removes the PostgreSQL container and its persisted named volume.
clean:
	$(COMPOSE) down --volumes --remove-orphans
