# General
Frontend and backend are provisioned in seperate containers. However as we use serverside rendering, the conainers have to be connected to each other. Therfore each conainers should not be started stand alone through 
```docker run``` but by executing the corresponding docker-compose file, wich is located in the backend repository. This will provision both the backend and the frontend container and interconnect them as necessary.
The Webapplication PixS is then 


# Requirements
- Install docker
- Install docker-compose

# Getting started

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



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
