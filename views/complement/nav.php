<header>
	<nav class="navbar navbar-default navbar-fixed-top top-nav" data-spy="affix" data-offset-top="100">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-top">
					<span class="sr-only">Menu</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<div class="logo">
					<a href="?view=index" class="navbar-brand"><?php echo APP_TITLE; ?></a>
				</div>
			</div>
			<div class="collapse navbar-collapse" id="navbar-top">
				<ul class="nav navbar-nav navbar-right">
          <li><a href="?view=index"><i class="fa fa-home fa-lg" aria-hidden="true"></i> Inicio</a></li>

					<?php if (!isset($_GET['view']) or $_GET['view'] != 'service'): ?>
						<li><a href="?view=service"><i class="fa fa-motorcycle fa-lg" aria-hidden="true"></i> Solicitar Servicio</a></li>
					<?php endif; ?>

					<?php if (!isset($_SESSION['app_id'])) { ?>
						<li><a href="#register" data-toggle="modal" data-target="#register"><i class="fa fa-user-plus fa-lg" aria-hidden="true"></i> Resgístrate</a></li>
						<li class="active"><a href="#login" data-toggle="modal"><i class="fa fa-key fa-lg" aria-hidden="true"></i> Iniciar Sesión</a></li>
					<?php } else { ?>
						<li><a href="?view=history"><i class="fa fa-history fa-lg" aria-hidden="true"></i> Mis Ordenes</a></li>
						<li class="dropdown drop-active">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">
								<span class="glyphicon glyphicon-user"></span> <?php echo $users[$_SESSION['app_id']]['nombre']; ?> <i class="fa fa-caret-down" aria-hidden="true"></i>
								<ul class="dropdown-menu">
									<li><a href="#"><i class="fa fa-cog" aria-hidden="true"></i> Mi Cuenta</a></li>
									<li class="divider"></li>
									<li><a href="?view=logout"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>
								</ul>
							</a>
						</li>

					<?php } ?>
				</ul>
			</div>
		</div>
	</nav>
</header>

<?php
if (!isset($_SESSION['app_id'])) {
	include(TEMPLATE_DIR . 'public/register.html');
	include(TEMPLATE_DIR . 'public/login.html');
}
?>
