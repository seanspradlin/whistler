FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN npm install && npm cache clean
COPY . /usr/src/app
EXPOSE 8080

CMD [ "npm", "start"  ]


