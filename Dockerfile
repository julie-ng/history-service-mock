FROM node:10
MAINTAINER Julie Ng <julie.ng@allianz.de>

WORKDIR /workspace

COPY ["package.json", "./"]

RUN npm install

COPY ["src/", "/workspace/src/"]
