# saas-ui

[![CI GitHub Action status](https://github.com/percona-platform/saas-ui/workflows/CI/badge.svg?branch=main)](https://github.com/percona-platform/saas-ui/actions?query=workflow%3ACI+branch%3Amain)

SaaS UI.

### Developing locally

Run a local dev environment with one command:

`make dev`

When developing locally, you'll want to route your API requests to a dev server. To do so, add the following key to your `package.json`:

```json
"proxy": "https://platform-dev.percona.com"
```

### Running E2E tests locally

To execute E2E tests locally you need to set related environment variables first. By default `.env.local` file is used as a source,
so you have to create it from `.env`:

```sh
cp .env .env.local
```

Then you should update `.env.local` with your own secrets.

To execute E2E tests just use `npm run cy:run`

### Store rules

1. By extension of the definition of the global store, reducers are also global and we want to keep
   them in one place (contrary to some practices, where reducers are kept close to the components).
2. All reducers should be typed.
3. The store is merely a combination of distinct store slices, every slice has its own key.
4. Action names should describe events that occured rather than look like setters.
5. Every action must obey the interface { type: string; payload?: PayloadType }. The payload should be strongly typed.
6. Action helpers are using [typesafe-actions](https://github.com/piotrwitek/typesafe-actions#using-action-creators-instances-instead-of-type-constants) library
