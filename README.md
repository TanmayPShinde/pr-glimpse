# pr-glimpse

> A GitHub App built with [Probot](https://github.com/probot/probot) that A github app created using Probot to get a glimpse of a new PR

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t pr-glimpse .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> pr-glimpse
```

## Contributing

If you have suggestions for how pr-glimpse could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2023 Tanmay Shinde
