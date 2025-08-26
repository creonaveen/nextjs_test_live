#!/usr/bin/env bash


if [ $# -lt 1 ]; then
    echo "Usage: $0 dev or prod ..."
    exit 1
fi

ENV=$1
if [ $ENV != "dev" ] && [ $ENV != "prod" ]; then
    echo "only dev or prod"
    exit 1
fi


echo "build process"
echo "--------------------------"
rm -r web
sleep 2
npm run format
sleep 2
npx next telemetry disable
sleep 2



rm ".env"

if [ $ENV == "dev" ]; then
    echo "build dev process"
    cp ".env-dev.local" ".env"
    sleep 2
fi

if [ $ENV == "prod" ]; then
    echo "build prod process"
    cp ".env-prod.local" ".env"
    sleep 2
fi


npm run build
sleep 2

mkdir web
sleep 2

cp -R ./.next/standalone/ ./web
cp -R ./public ./web/
cp -R ./.next/static ./web/.next/


rm ".env"

cp ".env-local.local" ".env"


sleep 2
npx next telemetry enable

echo "--------------------------"
echo "build successfuly"