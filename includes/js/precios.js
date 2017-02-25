var tarifaBase = 15;
var precioParadas = 2;
var precioKM = 3;
var precioExtraParadas = precioExtraKM = cantParadas = 0;
var distanciaTotal = 0;
var precioIdayVuelta = 0;
var descuentoCortesia = 0;

function calcularPrecio(distancia, paradas, idaVuelta) {
  cantParadas = paradas - 2;
  distanciaTotal = distancia;
  if (distancia >= 4.000) {
    precioAdicional();
  } else {
    precioNormal();
  }
  return precioTotalPagar();
}

function calcularPrecioIdayVuelta() {
  return 0;
}

function precioAdicional() {
  var distanciaExtra = distanciaTotal - 4.000;
  precioExtraKM = Math.floor(distanciaExtra) * precioKM;
  precioExtraParadas = cantParadas * precioParadas;

}

function precioNormal() {
  precioExtraParadas = cantParadas * precioParadas;
}

function precioTotalPagar() {
  return (tarifaBase + precioExtraKM + precioExtraParadas + precioIdayVuelta);
}

function mostrarDetalles() {
  $('#_detalle_servicio_').removeClass('hidden');
  __('_distancia_').innerHTML = "km. " + distanciaTotal;
  __('_tarifa_base_').innerHTML = "Bs. " + tarifaBase;
  __('_recargo_distancia_').innerHTML = "Bs. " + precioExtraKM;
  __('_recargo_paradas_').innerHTML = "Bs. " + precioExtraParadas;
  __('_recargo_ida_vuelta_').innerHTML = "Bs. " + precioIdayVuelta;
  __('_valor_total_').innerHTML = "Bs. " + (tarifaBase + precioExtraKM + precioExtraParadas + precioIdayVuelta);
  __('_descuento_').innerHTML = "Bs. " + descuentoCortesia;
  __('_Total_pagar_').innerHTML = "Bs. " + ((tarifaBase + precioExtraKM + precioExtraParadas + precioIdayVuelta) - descuentoCortesia);
  __('_solicitar_servicio_').innerHTML = '<button type="button" id="btn-solicitar" class="btn btn-primary btn-block btn-lg" onclick=""><span class="glyphicon glyphicon-off"></span> Solicitar Servicio</button>';
}
