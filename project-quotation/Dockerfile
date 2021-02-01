FROM node:14-alpine

# Update the system
RUN apk --no-cache -U upgrade
RUN apk install sqlite

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY *.json ./

# RUN npm install
# If you are building your code for production
RUN npm install -g yarn
RUN yarn install

# Bundle app source
COPY ./dist/* .

EXPOSE 3000
CMD [ "node", "server.js" ]