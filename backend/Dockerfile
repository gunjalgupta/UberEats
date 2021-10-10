#  Dockerfile for Node Express Backend

FROM node:11-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Install Dependencies
COPY package*.json ./



RUN apk add --no-cache make gcc g++ python && \
  npm cache clean --force && rm -rf node_modules\
  npm install && \
  npm rebuild bcryptjs --build-from-source && \
  apk del make gcc g++ python

# RUN npm run build

# Copy app source code
COPY . .

# Exports
EXPOSE 8081

CMD ["npm","start"]