# `hapi-react-hot-loader-example`
Example application demonstrating react-hot-loader-3 with webpack-2, react and friends, and hapi.

## get started
1. $ `yarn`
2. $ `yarn dev`
3. http://localhost:3000

## dev tasks
- $ `yarn lint` (eslint)
- $ `yarn dev` (local development w/ server)

> Type `rs` with a carriage return to restart nodemon if you make changes to the `server.js` file or any files within the `server` folder. It's not efficient to automatically restart nodemon on file changes.

###### Note: Saga's do not hot load. You will have to reload the browser. [Read more about potential issues](https://github.com/redux-saga/redux-saga/issues/22#issuecomment-218737951) and/or [implement yourself](https://gist.github.com/markerikson/dc6cee36b5b6f8d718f2e24a249e0491).


## production tasks
- $ `yarn prod` (production build w/ server)
- $ `yarn prod:build` (production build)

## staging tasks
- $ `yarn staging` (staging build w/ server)
- $ `yarn staging:build` (staging build)
