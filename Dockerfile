#FROM node:alpine
#
## Create app directory
#WORKDIR /usr/src/app
#
## Install app dependencies
## A wildcard is used to ensure both package.json AND package-lock.json are copied
## where available (npm@5+)
#COPY package*.json ./
#
## RUN yarn
## If you are building your code for production
## RUN npm install --only=production
#
#RUN mkdir -p /etc/letsencrypt
#
## Bundle app source
#COPY . .
#
#EXPOSE 3034
#CMD [ "npm", "start" ]

FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM node:alpine
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/build ./build
RUN yarn global add serve
EXPOSE 3034
CMD ["serve", "-s", "build", "-l", "3034"]