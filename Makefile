include ./.env
EXEC = docker exec ${DOCKER_API_CONTAINER_NAME}

connect-api: ## Connect to api container
	docker exec -it ${DOCKER_API_CONTAINER_NAME} bash

connect-db: ## Connect to database container
	docker exec -it ${DOCKER_DATABASE_CONTAINER_NAME} bash

init: build ## Build containers and init database

build: ## Build containers
	docker-compose up -d --build

restart: ## Restart containers
	docker-compose restart

