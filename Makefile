# Makefile for PostgreSQL Docker Compose setup
.PHONY: container up down logs psql clean status

container: up

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f db

psql:
	docker compose exec db psql -U admin -d nimbus-tech-db

status:
	docker compose ps

clean:
	docker compose down -v
	docker system prune -f
