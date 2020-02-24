FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5020
CMD "node" "app.js"
