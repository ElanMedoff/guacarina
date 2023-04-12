#!/bin/bash
LOG=/home/elan/guacarina.log
ECO=/home/elan/ecosystem.config.js
NPM=/home/elan/.nvm/versions/node/v16.16.0/bin/npm
NPX=/home/elan/.nvm/versions/node/v16.16.0/bin/npx
PM2=/home/elan/.nvm/versions/node/v16.16.0/bin/pm2
DIR=/var/www/guacarina

# overwrite
echo "" > $LOG

cd $DIR
echo "running npm install..." >> $LOG
$NPM install >> $LOG 2>&1
echo "ran npm install" >> $LOG

echo "rebuilding..." >> $LOG
$NPM run build >> $LOG 2>&1
echo "rebuilt" >> $LOG

echo "restarting pm2 daemon..." >> $LOG
$PM2 reload $ECO --only guacarina >> $LOG 2>&1
echo "restarted pm2 daemon" >> $LOG

