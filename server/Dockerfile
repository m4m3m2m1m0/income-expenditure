FROM node:lts

WORKDIR /usr/server

COPY package.json .
RUN npm install
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY src src/
EXPOSE 5000
CMD ["npm", "run", "start:dev"]