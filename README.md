[![Deploy to server](https://github.com/se-pixs/frontend/actions/workflows/deploy.yml/badge.svg)](https://github.com/se-pixs/frontend/actions/workflows/deploy.yml)

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
