#!/bin/sh

itemId="$1"
output="$2"
key="${GIRDER_API_KEY}"

if [ -z "${itemId}" ] || [ -z "${output}" ]; then
    echo >/dev/stderr "usage: circular-logo.sh <itemId> <outputfile>"
    exit 1
fi

if [ -z "${key}" ]; then
    echo >/dev/stderr "error: GIRDER_API_KEY is not set"
    exit 1
fi

# Get a token from Girder.
token=$(curl -s -X POST -d key="${key}" -d duration=0.001 https://data.kitware.com/api/v1/api_key/token | python ./extract-key.py)

curl -s -H "Girder-Token: ${token}" "https://data.kitware.com/api/v1/item/${itemId}/download" | convert png:- -resize 190x190 -background white -gravity center -extent 225x225 "${output}"
