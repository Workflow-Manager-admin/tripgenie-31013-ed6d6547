#!/bin/bash
cd /home/kavia/workspace/code-generation/tripgenie-31013-ed6d6547/tripgenie
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
 if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

