FROM node:18

COPY [".", "/usr/src/app/"]

WORKDIR /usr/src/app/

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]
