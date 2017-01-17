<?php

function Users() {
  $db = new Conexion();
  $sql = $db->query("SELECT * FROM users;");
  if ($db->rows($sql) > 0) {
    while ($d = $db->recorrer($sql)) {
      $users[$d['id']] = array(
        'id' => $d['id'],
        'nombre' => $d['nombre'],
        'apellido' => $d['apellido'],
        'email' => $d['email'],
        'celular' => $d['celular'],
        'telefono' => $d['telefono'],
        'pass' => $d['contrasena'],
        'nit' => $d['nit'],
        'razon_social' => $d['razon_social']
      );
    }
  } else {
    $users = false;
  }
  $db->liberar($sql);
  $db->close();

  return $users;
}

?>
