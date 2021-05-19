#!/bin/bash


if [ $NODE_ENV = "production" ] || [ $NODE_ENV = "prodk8s" ];then
  npm run ci
  npm run start
else
  npm run ci
  npm run start:test
fi
