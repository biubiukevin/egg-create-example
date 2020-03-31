FROM node:12.13.0-stretch-slim

RUN mkdir /app
WORKDIR /app

ENV TZ Asia/Shanghai

# add npm package
COPY package*.json ./

RUN npm i --registry=https://registry.npm.taobao.org --production

# copy code
COPY app ./app
COPY lib ./lib
COPY config ./config/
COPY agent.js ./
COPY app.js ./
COPY index.js ./
RUN mkdir ./logs

EXPOSE 60030

CMD npm start