#!/bin/bash

function cecho(){
    tput setaf $2;
    echo $1;
    tput sgr0;
}

cecho "building locally..." 4
if npx next build; then
  cecho "built locally" 2
else
  cecho "build failed, aborting" 1
  exit
fi

cecho "input commit message >" 4
read COMMIT
git add -A
git commit -m "$COMMIT"
git push origin master
git push server
