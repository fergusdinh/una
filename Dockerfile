FROM node:14
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm install pm2 -g --unsafe-perm
COPY package.json ./
COPY --chown=node:node yarn.lock ./
USER node
RUN yarn
COPY --chown=node:node . .
RUN ["yarn", "bootstrap"]
RUN ["yarn", "build"]
EXPOSE 3000
CMD [ "pm2-runtime", "process.json" ]
