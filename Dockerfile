FROM node:16.14.0 as api_development

WORKDIR /usr/src/api

CMD npm install && npm run 'development';
