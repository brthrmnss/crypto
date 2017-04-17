#!/bin/bash
#lxterminal -l -e 'echo this works; '
#lxterminal  -l -e 'echo this sh works ; node; /bin/bash '
 lxterminal  -l  --working-directory="/media/psf/Dropbox/projects/crypto/deploy_nodejs/breedv2" -t 'go' -e '/home/user/.nvm/versions/node/v0.12.5/bin/shipit staging list;  echo this sh works ; /bin/bash;'
#gnome-terminal --tab  --working-directory="/var/www/" --tab --working-directory='/home/' --tab --working-directory='/home/'
#exit 0