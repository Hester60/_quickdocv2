include ./.env

connect-api: ## Connect to api container
	docker exec -it ${DOCKER_API_CONTAINER_NAME} bash

connect-app: ## Connect to app container
	docker exec -it ${DOCKER_APP_CONTAINER_NAME} bash

init: up exec-setup seed-tags

exec-setup:
	docker exec -it quickdoc_database_1 ./scripts/cluster-setup.sh

up: ## Build containers
	docker-compose up -d

restart: ## Restart containers
	docker-compose restart

npm-install-app:
	docker exec -it ${DOCKER_APP_CONTAINER_NAME} npm install

npm-install-api:
	docker exec -it ${DOCKER_API_CONTAINER_NAME} npm install

seed-tags:
    docker exec -it ${DOCKER_API_CONTAINER_NAME} npm seed-tags
