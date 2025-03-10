FROM node:20-alpine
WORKDIR ./

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 80

# Serve the app using a static server (like serve)
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "80"]