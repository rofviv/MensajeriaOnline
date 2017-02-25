<?php
if (isset($_SESSION['app_id'])) {
  include(TEMPLATE_DIR . 'templates/profile.php');
} else {
  echo "no logeado, no hay perfil, error";
}
?>
