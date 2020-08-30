FROM node:10

ENV PORT=4000
ENV MONGO_DB_URI=mongodb://host.docker.internal/tiny-dancer
ENV JWT_SECRET=Ybp8AS5g6H

WORKDIR /
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
COPY .babelrc .
COPY server/ server/

CMD ["yarn", "start:server"]