FROM node:16
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci
ENV DEBUG=containers:*
USER node
CMD npm start
CMD DEBUG=playground:* npm start