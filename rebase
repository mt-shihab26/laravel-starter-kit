#!/bin/bash

OG_BRANCH=$(git branch --show-current)

echo "+++++++++++++++++++"
git checkout main
git pull
echo "-------------------"

echo "+++++++++++++++++++"
git checkout dev
git pull
git rebase main
git push --force-with-lease
echo "-------------------"

git checkout "$OG_BRANCH"
