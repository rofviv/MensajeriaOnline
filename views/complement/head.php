<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <base href="<?php echo APP_URL; ?>" />
  <meta charset="utf-8" name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <link rel="stylesheet" href="includes/libs/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="includes/libs/fonts/font-awesome.min.css">
  <link rel="stylesheet" href="includes/css/styles.css">

  <?php if (isset($_GET['view']) and $_GET['view'] == 'service'): ?>
  <style>
    .top-nav {padding-top:0px; padding-bottom:0px;}
    .affix-top {padding-top:0px; padding-bottom:0px;}
    body {padding-top: 50px;}
  </style>
  <?php endif; ?>

  <script type="text/javascript" src="includes/js/generales.js"></script>

  <title><?php echo APP_TITLE; ?></title>
</head>
