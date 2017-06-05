<?php
$comando = "sudo /var/www/html/stop.sh ";
 shell_exec("/usr/bin/nohup ".$comando." >/dev/null 2>&1 &");

$comando = "sudo /var/www/html/start.sh ";
 shell_exec("/usr/bin/nohup ".$comando." >/dev/null 2>&1 &");


?>




<?php
//$output = shell_exec('sudo /var/www/html/stop.sh'." > /var/www/html/debug.log 2>&1");
$output = shell_exec('sudo /var/www/html/stop.sh');
//echo "<pre>$output</pre>";
//echo "---";
header("HTTP/1.0r 404 Not Found");
echo "<h1>404 Not Found</h1>";
echo "The page that you have requested could not be found.";
exit();
?>