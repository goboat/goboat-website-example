#!/bin/bash

echo context $CONTEXT
echo branch $BRANCH
echo release $COMMIT_REF
echo NODE_ENV EQUALZ $NODE_ENV

echo 'trying to generate content service schema file'
export NODE_ENV=development
cd ../../services/content && npm ci && npm run generate-schema && cd -
npm run generate

EXITCODE=$?
if [ "$EXITCODE" -ne "0" ]; then
  echo "Codegen failed - lets get out of here"
  exit $EXITCODE
fi

npm run build

EXITCODE=$?
if [ "$EXITCODE" -ne "0" ]; then
  echo "Build failed - lets get out of here"
  exit $EXITCODE
fi

if [ $BRANCH == 'master' ]; then
  cp _redirects_production .next/_redirects
else
  cp _redirects_staging .next/_redirects
fi


echo 'BUILD DONE'
