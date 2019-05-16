#!/bin/bash

set -e

if [[ $TRAVIS_PULL_REQUEST == "true" ]] && [[ $TRAVIS_BRANCH == "development" ]]; then
  npm run coverage && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls
fi
