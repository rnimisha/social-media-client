#!/bin/bash

# Build image
docker build -t connectify -f Dockerfile .

# Run container
docker run -p 3007:3007 --name connectifyapp connectify
