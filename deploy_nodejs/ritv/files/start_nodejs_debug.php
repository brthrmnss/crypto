<?php
$comando = "sudo /var/www/html/start.sh ";
// shell_exec("/usr/bin/nohup ".$comando." >/dev/null 2>&1 &");





 $output = shell_exec($comando." > /var/www/html/debug.log 2>&1");
 echo "<pre>$output</pre>";

?>