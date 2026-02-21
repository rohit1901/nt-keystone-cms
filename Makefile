# Makefile for PostgreSQL Docker Compose setup
.PHONY: container up down logs psql clean status

container: up

up:
	docker compose -f docker-compose.postgres.yml up -d --build

down:
	docker compose -f docker-compose.postgres.yml down

logs:
	docker compose -f docker-compose.postgres.yml logs -f db

psql:
	docker compose -f docker-compose.postgres.yml exec db psql -U admin -d nimbus-tech-db

status:
	docker compose -f docker-compose.postgres.yml ps

clean:
	docker compose -f docker-compose.postgres.yml down -v
	docker system prune -f
