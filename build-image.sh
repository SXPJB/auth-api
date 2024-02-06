#!/bin/bash

# Load environment variables
export $(grep -v '^#' .env | xargs)

# Get version argument
VERSION=$1

# Build the image
docker build \
  --build-arg PORT=$PORT \
  --build-arg DB_HOST=$DB_HOST \
  --build-arg DB_PORT=$DB_PORT \
  --build-arg DB_USER=$DB_USER \
  --build-arg DB_PASSWORD=$DB_PASSWORD \
  --build-arg DB_NAME=$DB_NAME \
  --build-arg SMTP_TO_EMAIL=$SMTP_TO_EMAIL \
  --build-arg SMTP_PASSWORD=$SMTP_PASSWORD \
  --build-arg TOKEN_SECRET=$TOKEN_SECRET \
  -t auth-api:$VERSION .