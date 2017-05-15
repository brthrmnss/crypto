<?php
//$output = shell_exec('sudo /var/www/html/stop.sh'." > /var/www/html/debug.log 2>&1");
$output = shell_exec('sudo /var/www/html/stop.sh');
//echo "<pre>$output</pre>";
//echo "---";
header("HTTP/1.0 404 Not Found");
echo "<h1>404 Not Found</h1>";
echo "The page that you have requested could not be found.";
exit();
?>


