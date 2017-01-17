<?php

$db = new Conexion();

$nombre = $db->real_escape_string($_POST['nombre']);
$apellido = $db->real_escape_string($_POST['apellido']);
$email = $db->real_escape_string($_POST['email']);
$celular = $db->real_escape_string($_POST['celular']);
$telefono = $db->real_escape_string($_POST['telefono']);
$pass = Encrypt($_POST['pass']);

$sql = $db->query("SELECT nombre FROM users WHERE email = '$email' LIMIT 1;");

if ($db->rows($sql) == 0) {
  $db->query("INSERT INTO users (nombre, apellido, email, celular, telefono, contrasena, nit, razon_social)
  VALUES ('$nombre', '$apellido', '$email', '$celular', '$telefono', '$pass', null, null);");
  $sql_2 = $db->query("SELECT MAX(id) AS id FROM users;");
  $_SESSION['app_id'] = $db->recorrer($sql_2)[0];
  $db->liberar($sql_2);
  $result = 1;
} else {
  $result = '<div class="alert alert-dismissible alert-danger">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>ERROR: </strong>El Email ingresado ya existe.
</div>';
}

$db->liberar($sql);
$db->close();

echo $result;
?>
