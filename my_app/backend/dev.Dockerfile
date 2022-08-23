FROM node:16
USER node
WORKDIR /usr/src/app/
COPY --chown=node:node . .
RUN npm install
ENV DEBUG=app_backend:*
CMD npm run dev