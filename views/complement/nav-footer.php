<nav id="nav-bottom" class="navbar navbar-inverse navbar-fixed-bottom" role="navigation">
 <div class="container">
  <div class="navbar-header">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navegacion">
      <span class="sr-only">Mostrar navegacion</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
        <a href="#" class="navbar-brand">Logotipo</a>
  </div>
  <div class="collapse navbar-collapse" id="navegacion">

    <?php if (!isset($_GET['view']) or $_GET['view'] != 'service'): ?>
      <ul class="nav navbar-nav" role="tablist">
        <li class="active"><a href="#services" class="page-scroll">Servicios</a></li>
        <li class=""><a href="#" class="page-scroll"><i class="fa fa-money" aria-hidden="true"></i> Precios</a></li>
        <li class=""><a href="#" class="page-scroll"><i class="fa fa-map" aria-hidden="true"></i> Coberturas</a></li>
      </ul>
    <?php endif; ?>

    <p class="navbar-text pull-right">
      <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> Chat</a>
    </p>

    <?php if (!isset($_SESSION['app_id'])) { ?>
      <p class="navbar-text pull-right">
        <a href="#login" data-toggle="modal" class="navbar-link"><i class="fa fa-user-times" aria-hidden="true"></i> No has iniciado sesión</a>
      </p>
    <?php } else { ?>
      <p class="navbar-text pull-right">
        <i class="fa fa-user-circle-o" aria-hidden="true"></i> Conectado como <a href="?view=profile" class="navbar-link"><?php echo $users[$_SESSION['app_id']]['nombre'] . ' ' . $users[$_SESSION['app_id']]['apellido'] ?></a>
      </p>
    <?php } ?>
  </div>
</div>
</nav>
