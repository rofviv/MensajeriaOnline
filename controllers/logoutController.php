<?php

unset($_SESSION['app_id'],$_SESSION['cantidad_usuarios'],$_SESSION['users']);
// include ('views/public/goodbye.php');
header('location: ?view=index');

?>
