FROM node

RUN mkdir -p /usr/src/static
WORKDIR /usr/src/static

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/static
RUN npm install && npm cache clean
COPY . /usr/src/static
EXPOSE 8000

CMD [ "npm", "run", "dev" ]

