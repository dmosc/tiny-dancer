FROM node:10

ENV PORT=4000

WORKDIR /app
COPY . .
RUN yarn install --production

CMD ["yarn", "start"]