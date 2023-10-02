FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only_production
RUN npm i bcrypt
CMD ["npm", "start"]