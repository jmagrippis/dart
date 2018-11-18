#!/bin/bash

export $(grep -v '^#' .env.local | xargs)

yarn knex seed:run --env development
