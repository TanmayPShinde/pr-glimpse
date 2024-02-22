# pr-glimpse

> A github app created using Probot to get description of a new PR using Generative AI
> * [Go to the App](https://github.com/apps/pr-glimpse) 🔗


### demo video
https://github.com/TanmayPShinde/pr-glimpse/assets/62463484/4c2d51bc-4083-4a25-ab2a-4cad68508fad



## Tech Stack
1. Probot (Node.js framwork)
2. Github Apps
3. Javascript
4. Open AI - LLM API

## Setup Instructions
1. Clone the Repository
2. Install dependencies
```sh
npm install
```
3. Start the local server
```sh
npm start
```
4. Head to https://localhost:3000
```
    - probot will start configuring your app by creating a .env file
    - It will also add **WEBHOOK_PROXY_URL** in the env
```
5. Click on the _Register Github App_ button
```
    - you will be redirected to a page prompting to enter a **name** for the app
    - on proceeding, you will be asked to install the app on any repo
```
6. Now restart the local server
```
    - in the process, your env will be populated with more variables
```
7. Install the app on a repo, and you're all set

## Docker

```sh
# 1. Build container
docker build -t pr-glimpse .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> pr-glimpse
```
