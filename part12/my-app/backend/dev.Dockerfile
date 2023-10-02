FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm i bcrypt
CMD ["npm", "run", "dev"]