#!/bin/bash
set -e

if [ ! -f /settings.json ] || [ -d /settings.json ]
then
  echo "settings.json not exists or is a directory. Please mount to /settings.json"
  exit
fi

cp /settings.json settings.json


npm start
