<?php

if ($_POST) {

  require('includes/core/core.php');

  switch (isset($_GET['mode']) ? $_GET['mode'] : null) {
    case 'login':
      require('includes/core/ajax/goLogin.php');
      break;
    case 'reg':
      require('includes/core/ajax/goReg.php');
      break;
    default:
      //header('location: index.php');
      break;
  }
} else {
  header('location: index.php');
}

?>
