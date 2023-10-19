# Vanti Webpage/Commerce

[![License | PROPIEATARY](https://img.shields.io/badge/License-PROPIETARY-yellow)](https://www.aplyca.com/es/politica-de-privacidad) [![platform Linux | macOS | Windows](https://img.shields.io/badge/platform-Linux%20%7C%20macOS%20%7C%20Windows-lightgrey.svg)](https://www.docker.com/products/docker-desktop) [![docker-compose](https://img.shields.io/badge/%F0%9F%90%B3-docker--compose-blue.svg)](https://medium.com/rate-engineering/using-docker-containers-to-run-a-distributed-application-locally-eeabd360bca3) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://semantic-release.gitbook.io/semantic-release/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) for develop [Vanti](https://www.grupovanti.com/) webpage/commerce with [Contentful](https://www.contentful.com) headless CMS and [CommerceLayer](https://commercelayer.io/).

## Development knowledges

- [ReactJs](https://reactjs.org/docs/getting-started.html)
- [NextJs](https://nextjs.org/docs)
- [Typescript](https://nextjs.org/learn/excel/typescript)
- [Tailwindcss](https://tailwindcomponents.com/cheatsheet/)
- [GraphQL](https://www.contentful.com/developers/docs/references/graphql/)
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Contentful](https://www.contentful.com/developers/docs/)
- [CommerceLayer](https://commercelayer.io/)
- [PlaceToPay](https://docs.placetopay.dev/)
- [Algolia](https://www.algolia.com/doc/)
- [Sendgrid](https://docs.sendgrid.com/)
- [PNPM](https://pnpm.io/)
- [YARN](https://yarnpkg.com/)

Remember mantain the [best good practices](https://stackoverflow.blog/2022/03/30/best-practices-to-increase-the-speed-for-next-js-apps/) and check your code with `make lint`.

## Prerequisites

- GNU Make (preinstalled in Linux and macOS, [see for Windows](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows) or use [Docker Desktop for WSL 2](https://engineering.docker.com/2019/06/docker-hearts-wsl-2/))
- [Docker](https://www.docker.com) and [Docker compose](https://docs.docker.com/compose/)

## Make available commands

You can use `make help` for list available commands:

```
ℹ️  Usage: `make <task>` [option=value]
Default task: init

{*} Tasks:
  init i         [*] Create and start the environment. This is the default task.
  h help         [!] This help.
  build          [*] Build or rebuild one or all service containers
  up reload      [*] Up/Reload one or all service containers
  start          [*] Start one or all service containers
  restart        [*] Restart one or all service containers
  stop           [*] Stop or or all service containers
  remove         [*] Stop and Remove one or all service containers
  down d         [*] Down one or all service container[s], network[s] and volume[s]
  status ps s    [*] Show status of services
  cli exec       [*] Execute commands in service containers, use "command"  argument to send the command. By Default enter the shell.
  run            [*] Run commands in a new service container
  logs l         [*] Show logs. Usage: make logs [service=app]
  copy           [*] Copy app files/directories from service container to host
  sync           [*] Copy packages files generated inside service container to host
  linter         [*] Lint code
  cfcm.download  [*] Export contentful space content model
```
## Install

- Download project via git `git clone git@github.com:Grupo-Vanti/MarketplaceWeb.git` or https with `git clone https://github.com/Grupo-Vanti/MarketplaceWeb.git`
- Enter into project dir `cd MarketplaceWeb`
- Run make command for generate and up containers `make`
- Open [http://localhost:39080](http://localhost:39080) with your browser to see the result. Remember, if you have `APP_PORT_PREFIX` var in your .env file, the port in URL must be the same followed by 080.
- Happy codding

## Init Storybook

This project is implemented with [Storybook](https://storybook.js.org/), if you want to start the storybook service follow command below:

```bash
$ make service=storybook
```

Open [http://localhost:39006](http://localhost:39006) with your browser to see the result. Remember, if you have `APP_PORT_PREFIX` var in your .env file, the port in URL must be the same followed by 006.

## Pushing the changes to the repo

-   This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for releasing new versions
-   This projects adheres to [Conventional Commits](https://conventionalcommits.org) for commit guidelines
-   This project uses [Semantic Realease](https://semantic-release.gitbook.io/semantic-release) to automatically release a new version depending on commits messages
-   This project uses [Semantic Release Changelog](https://github.com/semantic-release/changelog) to automatically generate CHANGELOG.md file

## Learn More

To learn more about libraries used in this projects, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Learn Tailwind CSS](https://tailwindcss.com/docs) - learns about tailwind css features, components and configurations.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [implementation and deployment guide](https://app.clickup.com/454546/v/dc/dvwj-6665/dvwj-32364) for more details.

This project contain Github Actions/Pipelines definitions for deploy in vercel via pull request (for preview) or tags (for production).

## Override configurations

Create .env file with enviroment variables below:

### DOCKER ENV
- `APP_NAME`: Prefix for docker services names (default: VANTI-WEBCOMMERCE)
- `TARGET_IMAGE`: Can use **dev** or **prod** to indicate docker the name of the image
- `NODE_ENV`: Can use **development** or **production** to indicate the Next.JS build mode  
- `DEFAULT_SERVICE`: Can use **storybook**, **app** or **mailer** for avoid service=... argument in make scripts (default: app)
- `APP_PORT_PREFIX`: Prefix number to map ports on services (default: 39)
- `DEFAULT_DOMAIN`: Domain used by services that don't have access to absolute routes

### RUNTIME
There are a lot of other environment variables that you can use in this project (as much as the services it used), if you want more details you can see the `.env.dist`
