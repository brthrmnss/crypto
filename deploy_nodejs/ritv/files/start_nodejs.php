<?php
$comando = "sudo /var/www/html/start.sh ";
 shell_exec("/usr/bin/nohup ".$comando." >/dev/null 2>&1 &");





 //$output = shell_exec('sudo /var/www/start/run.sh'." > /var/www/html/debug.log 2>&1");
 //echo "<pre>$output</pre>";

?>