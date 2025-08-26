#!/usr/bin/env bash

echo "Deploying process"
echo "--------------------------"

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
echo "---Git Pulling $branch---"
git stash
git checkout $branch
git pull --rebase
 
echo "--- pm2 delete web ---"

pm2 delete "web"

pm2 flush all

echo "--- pm2 start ---"

sleep 2

pm2 --max-memory-restart 400M start "web/server.js" --name "web" -i max -o "/dev/null" -e "/dev/null"

echo "--------------------------"

echo "Started ..."

pm2 startup

pm2 set pm2:startup systemd

echo "startup ..."


pm2 save

echo "saved ..."

sleep 2

pm2 scale web +3 

echo "-----------Free memory----------"

free -mh

echo "-----------Free memory----------"
