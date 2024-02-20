# Use the official Node.js 18 Alpine image as the base image
FROM node:18-alpine as development

WORKDIR /home/node/back

COPY package.json ./

RUN yarn install --only=development

COPY . .

RUN yarn build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/node/back

COPY package.json ./

RUN yarn install --only=production

COPY . .

COPY --from=development /home/node/back/dist ./dist

CMD ["node", "dist/main"]
