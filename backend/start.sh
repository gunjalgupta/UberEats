#!/usr/bin/env bash

# install new dependencies if any
npm install

# uninstall the current bcrypt modules
npm uninstall bcryptjs

# install the bcrypt modules for the machine
npm install bcryptjs

echo "Starting API server"

npm start