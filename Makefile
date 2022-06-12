include ./.env

connect-api: ## Connect to api container
	docker exec -it ${DOCKER_API_CONTAINER_NAME} bash

connect-app: ## Connect to app container
	docker exec -it ${DOCKER_APP_CONTAINER_NAME} bash

init: up exec-setup

exec-setup:
	docker exec -it quickdoc_database_1 ./scripts/cluster-setup.sh

up: ## Build containers
	docker-compose up -d
restart: ## Restart containers
	docker-compose restart

