## STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

##RUN npm i -g @angular/cli

RUN npm ci && mkdir /kafkautilui && mv ./node_modules ./kafkautilui

WORKDIR /kafkautilui

COPY . .
RUN ls -l
## Build the angular app in production mode and store the artifacts in dist folder

RUN npm run ng build -- --prod --output-path=dist


### STAGE 2: Setup ###

FROM nginxinc/nginx-unprivileged

## Copy our default nginx config
COPY nginx.conf /etc/nginx/conf.d/
##RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

## Remove default nginx website
##RUN sudo rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /kafkautilui/dist /usr/share/nginx/html
RUN ls -l
##RUN cp -r /kafkautilui/dist/ /usr/share/nginx/html
