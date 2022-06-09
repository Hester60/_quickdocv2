include ./.env
EXEC = docker exec ${DOCKER_API_CONTAINER_NAME}
EXEC_DB =

connect-api: ## Connect to api container
	docker exec -it ${DOCKER_API_CONTAINER_NAME} bash

init: build exec-setup

exec-setup:
	docker exec -it quickdoc_database_1 ./scripts/cluster-setup.sh

build: ## Build containers
	docker-compose up -d --build

restart: ## Restart containers
	docker-compose restart

