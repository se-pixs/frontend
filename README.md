[![Deploy to server](https://github.com/se-pixs/frontend/actions/workflows/deploy.yml/badge.svg)](https://github.com/se-pixs/frontend/actions/workflows/deploy.yml)
[![Built with - Nextjs](https://img.shields.io/badge/Built_with-Next.js-000000.svg?style=flat&logo=vercel)](https://nextjs.org/)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/68f1d0c1057f4d0c82beecdb1ca4d591)](https://www.codacy.com/gh/se-pixs/frontend/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=se-pixs/frontend&amp;utm_campaign=Badge_Grade)

# PiXS Frontend 

A frontend webapplication for the PiXS application build with NextJS.

## General
Frontend and backend are provisioned in seperate containers. However as we use serverside rendering, the conainers have to be connected to each other. Therfore, each conainers should not be started stand alone through 
```docker run``` but by executing the corresponding docker-compose file, which is located in the backend repository. This will provision both - the backend and the frontend - container and interconnect them as necessary.
The Webapp PiXS is then ...


## Requirements
- Install docker
- Install docker-compose

## Getting started

- First clone the frontend Repository
-   ```shell
    cd /frontend
    ```
- Then change the pixs.config.template.js file to pixs.config.js. You may also apply necessary changes to the config in this step.

-   ```shell
    docker build . -t frontend:latest
    ```
- provision the backend container (see frontend readme)
-   ```shell
    cd /backend
    ```
-   ```shell
    docker-compose up -d
    ```
