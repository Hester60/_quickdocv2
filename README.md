# Quickdocv2
About I'm building my own documentation tool that I called Quickdoc. This tool is only for my personal use but the source code is open.

This README will contain information about project setup and other stuff.

## Init

1. Create .env from .env.example and fill variables with your own values
2. Run the following command at project root directory ``openssl rand -base64 756 > ./scripts/cluster.key``
3. Still at root, run the following command ``chmod 400 ./scripts/cluster.key``
4. Run ``make init``. It will create containers and run setup.sh script

## Run it on production

For the moment, ``make init`` will not work for start production build. 
Please follow this step :

1. Create .env from .env.example and fill variables with your own values. Change environment by ``production``.
2. Run the following command at project root directory ``openssl rand -base64 756 > ./scripts/cluster.key``
3. Still at root, run the following command ``chmod 400 ./scripts/cluster.key``
4. Run ``make up``
5. Run ``make exec-setup``
6. Run ``make seed-tags``. If it throw an error, try to launch it again

