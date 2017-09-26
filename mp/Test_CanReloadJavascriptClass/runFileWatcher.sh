inotifywait -e close_write,moved_to,create -m "/media/sf_Dropbox/projects/crypto/mp/GrammarHelperServer/" |
#while read -r directory events filename; do
while read path action file; do
    echo "$file"
  node /media/sf_Dropbox/projects/crypto/mp/Test_CanReloadJavascriptClass/projectFileWatcherLinux.js "$file"
done