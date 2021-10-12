FROM node:13.12.0 as BUILD
WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --silent
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]
