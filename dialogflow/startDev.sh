#!/bin/bash

yarn tsc --watch &
yarn nodemon -r dotenv/config ./build/index.js
