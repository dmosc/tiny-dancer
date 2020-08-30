FROM node:10

ENV PORT=4000

WORKDIR /app
COPY ../package.json .
COPY ../yarn.lock .
COPY ../.babelrc .
COPY . .
RUN yarn install --production

CMD ["yarn", "start"]