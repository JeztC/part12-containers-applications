FROM node:16
WORKDIR /usr/src/app
COPY --chown=node:node . .
COPY . .
RUN npm ci --only=production
ENV DEBUG=app_backend:*
USER node
CMD npm start
CMD DEBUG=app_backend:* npm start