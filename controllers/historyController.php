<?php
if (isset($_SESSION['app_id'])) {
  include(TEMPLATE_DIR . 'templates/history.php');
} else {
  echo "no logeado, error";
}
?>
