#!/bin/bash

export $(grep -v '^#' .env.local | xargs)

COMMAND=$1
yarn cypress $COMMAND
