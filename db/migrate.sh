#!/bin/bash

export $(grep -v '^#' .env.local | xargs)

yarn knex migrate:latest --env development
yarn knex migrate:latest --env production
