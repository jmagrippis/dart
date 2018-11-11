#!/bin/bash

yarn tsc --watch &
yarn nodemon ./build/index.js
