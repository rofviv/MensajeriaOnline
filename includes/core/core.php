<?php

session_start();

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'mensajeria_db');

define('TEMPLATE_DIR', 'views/');
define('APP_TITLE', 'Mensajeria');
define('APP_COPY', 'Copyright &copy; ' . date('Y', time()) . ' ' . APP_TITLE . ' Software.');
define('APP_URL', 'http://localhost/mensajeria/');

require('models/class.Conexion.php');
require('includes/core/functions/Encrypt.php');
require('includes/core/functions/Users.php');

$users = Users();

?>
