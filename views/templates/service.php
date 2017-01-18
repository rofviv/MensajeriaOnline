<?php include(TEMPLATE_DIR . 'complement/head.php'); ?>
<body>
  <?php include(TEMPLATE_DIR . 'complement/nav.php'); ?>
  <?php include(TEMPLATE_DIR . 'complement/nav-footer.php'); ?>

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5 right-panel">
        <div class="divDatos">
          <div class="panel panel-default">
            <div class="panel-heading">
  						<h6>Información de la orden</h6>
  					</div>
            <div class="panel-body global">
              <div class="form-group">
  							<div class="date-service">
                  <button class="btn btn-default btn-md" id="btn-programarS" type="button" onclick="programarServicio()"><i class="fa fa-calendar fa-lg" aria-hidden="true"></i> Programar Servicio <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                  <div class="hidden" id="fecha-hora" style="padding-top:10px;">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-calendar-o fa-lg" aria-hidden="true"></i></span>
  												<input id="fecha-servicio" class="form-control" type="text" placeholder="16-01-2017">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i></span>
  												<input id="hora-servicio" class="form-control" type="text" placeholder="16:30">
                        </div>
                      </div>
                    </div>
                  </div>
  							</div>
  						</div>
              <div class="panel panel-default panel-horizontal" id="panel-A">
                <div class="panel-heading">
						        <h3 class="panel-title">A</h3>
						    </div>
                <div class="panel-body">
                  <span class="pull-right clickable hidden" id="close-A" onclick="eliminarDireccion('A')"><i class="fa fa-times"></i></span>
                  <div class="row">
										<div class="col-md-12 text-center">
											<div class="input-group">
												<span class="input-group-addon"><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i></span>
												<input id="ubicacion-A" class="form-control" type="text" placeholder="Ubicacion GPS" onkeypress="buscarUbicacion(event, 'A')" onclick="verificarError('A')">
												<span class="input-group-btn">
													<button id="boton-gps-A" class="btn btn-secondary btn-default" title="Detectar mi ubicación" type="button" onclick="myGeolocation('A')">
                            <i class="fa fa-crosshairs fa-lg" aria-hidden="true"></i>
													</button>
												</span>
											</div>
										</div>
									</div>
                  <div class="row">
										<div class="col-md-12 text-center">
											<div class="input-group">
												<span class="input-group-addon"><i class="fa fa-pencil fa-md" aria-hidden="true"></i></span>
												<input id="referencias-A" class="form-control" type="text" placeholder="Direccion Escrita" onclick="verificarError('A')">
											</div>
										</div>
									</div>
                  <div class="row">
										<div class="col-md-12">
											<div class="input-group">
			    								<span class="input-group-addon"><i class="fa fa-info fa-lg" aria-hidden="true"></i></span>
												<textarea id="instrucciones-A" class="form-control" style="resize: none; width: 100%;" placeholder="Que hacer al llegar aqui" onclick="verificarError('A')"></textarea>
			    							</div>
										</div>
									</div>
                </div>
              </div>
              <div class="panel panel-default panel-horizontal" id="panel-B">
                <div class="panel-heading">
						        <h3 class="panel-title">B</h3>
						    </div>
                <div class="panel-body">
                  <span class="pull-right clickable hidden" id="close-B" onclick="eliminarDireccion('B')"><i class="fa fa-times"></i></span>
                  <div class="row">
										<div class="col-md-12 text-center">
											<div class="input-group">
												<span class="input-group-addon"><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i></span>
												<input id="ubicacion-B" class="form-control" type="text" placeholder="Ubicacion GPS" onkeypress="buscarUbicacion(event, 'B')" onclick="verificarError('B')">
												<span class="input-group-btn">
													<button class="btn btn-secondary btn-default" title="Detectar mi ubicación" type="button" onclick="myGeolocation('B')">
													  <i class="fa fa-crosshairs fa-lg" aria-hidden="true"></i>
													</button>
												</span>
											</div>
										</div>
									</div>
                  <div class="row">
										<div class="col-md-12 text-center">
											<div class="input-group">
												<span class="input-group-addon"><i class="fa fa-pencil fa-md" aria-hidden="true"></i></span>
												<input id="referencias-B" class="form-control" type="text" placeholder="Direccion Escrita" onclick="verificarError('B')">
											</div>
										</div>
									</div>
                  <div class="row">
										<div class="col-md-12">
											<div class="input-group">
			    								<span class="input-group-addon"><i class="fa fa-info fa-lg" aria-hidden="true"></i></span>
												<textarea id="instrucciones-B" class="form-control" style="resize: none; width: 100%;" placeholder="Que hacer al llegar aqui" onclick="verificarError('B')"></textarea>
			    							</div>
										</div>
									</div>
                </div>
              </div>
              <div id="nuevosElementos"></div>
              <div class="text-right" style="padding-bottom:10px;">
                <button class="btn btn-default btn-md" type="button" onclick="nuevaDireccion()"><i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i> Añadir dirección</button>
              </div>
            </div>
            <div class="panel-footer" style="padding-bottom: 0px; margin.bottom:0px;">
              <table class="table table-condensed" style="padding-bottom: 0px; margin.bottom:0px; ">
  							<tr>
  								<td>Distancia</td>
  								<td id="distancia">0 Km</td>
  							</tr>
  							<tr>
  								<td>Valor a pagar</td>
  								<td>Bs. 0</td>
  							</tr>
  							<tr>
  								<td colspan="2">
                    <a href="#confirmar" class="btn btn-success btn-lg btn-block" type="button" data-toggle="modal" onclick="confirmarServicio()"><i class="fa fa-key fa-lg" aria-hidden="true"></i> Confirmar Servicio</a>
  								</td>
  							</tr>
  						</table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7 left-panel">
        <div class="map-responsive">
    			<div id="mapa"></div>
    		</div>
      </div>
    </div>
  </div>

  <?php include(TEMPLATE_DIR . 'complement/footer.php'); ?>
  <?php include(TEMPLATE_DIR . 'public/serviceConfirm.html'); ?>

  <script type="text/javascript" src="includes/js/maps.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBku1G8U3PY79XNSB_WMxMFC-_g1CPwvXc&libraries=places&callback=iniciarMapa" async defer></script>
</body>
</html>
