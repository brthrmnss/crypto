#!/bin/bash
echo '/home/user/.nvm/versions/node/v0.12.5/bin/shipit staging list'
cd /media/psf/Dropbox/projects/crypto/deploy_nodejs/breedv2



#connect into tmux
ssh root@5.79.75.96 -t tmux a
-l
SPACE

ssh -tt root@5.79.75.96 << EOF
 echo yyy
 echo yyyid
 tmux attach
 echo yyy
EOF
#/home/user/.nvm/versions/node/v0.12.5/bin/shipit staging list