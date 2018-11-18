#!/bin/bash

export $(grep -v '^#' .env.local | xargs)

yarn knex migrate:rollback --env development
yarn knex migrate:rollback --env production
