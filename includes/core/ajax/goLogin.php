<?php

if (!empty($_POST['email']) and !empty($_POST['pass'])) {
  $db = new Conexion();
  $email = $db->real_escape_string($_POST['email']);
  $pass = Encrypt($_POST['pass']);
  $sql = $db->query("SELECT id FROM users WHERE email='$email' AND contrasena='$pass' LIMIT 1;");
  if ($db->rows($sql) > 0) {
    if ($_POST['sesion']) {
      ini_set('session.cookie_lifetime', time() + (60 * 60 * 24));
    }
    $_SESSION['app_id'] = $db->recorrer($sql)[0];
    echo 1;
  } else {
    echo '<div class="alert alert-dismissible alert-danger">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>ERROR: </strong>El email y contraseña no coinciden.
  </div>';
  }
  $db->liberar($sql);
  $db->close();
} else {
  echo '<div class="alert alert-dismissible alert-danger">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>ERROR: </strong>Todos los campos deben estar llenos.
</div>';
}


?>
