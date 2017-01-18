var directionsDisplay, directionsService, gMap;
var marcadores = [];
var labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var cantDirecciones = 2;
var servicioProgramado = false;
function iniciarMapa() {
  var divMapa = document.getElementById('mapa');
  gMap = new google.maps.Map(divMapa, {
    center: {lat: -17.783359, lng: -63.182122},
    zoom: 15,
    scrollwheel: false
  });
  inicializarPrediccion('A');
  inicializarPrediccion('B');
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: gMap,
    suppressMarkers: true
  });
  directionsDisplay.addListener('directions_changed', function() {
    calcularDistancia(directionsDisplay.getDirections());
  });
  gMap.addListener('click', function(e) {
  	if (cantDirecciones < (marcadores.length + 1)) {
  		nuevaDireccion();
  	}
  	adicionarMarcador(e.latLng, labels[marcadores.length]);
  	actualizarParadas();
	});

}

function inicializarPrediccion(name) {
  var buscador = document.getElementById("ubicacion-" + name);
  var options = {
    componentRestrictions: {country: "bo"}
  };
  var autocomplete = new google.maps.places.Autocomplete(buscador, options);
  var e = {
  	keyCode: 13
  }
  autocomplete.addListener('place_changed', function() {
  	buscarUbicacion(e, name);
  });
}

function buscarUbicacion(e, name) {
	if (e.keyCode == 13) {
		var text = document.getElementById('ubicacion-' + name).value;
		var gCoder = new google.maps.Geocoder();
		var objInformacion = {
			address: text + ", Santa Cruz de la Sierra, Bolivia"
		}
		gCoder.geocode(objInformacion, function (datos, status) {
			var coordenadas = datos[0].geometry.location;
			adicionarMarcador(coordenadas, name);
			actualizarParadas();
	  });
	}
}

function myGeolocation(etiqueta) {
	navigator.geolocation.getCurrentPosition(fn_success);
	function fn_success(pos) {
		var lat = pos.coords.latitude;
		var lon = pos.coords.longitude;
		var gLatLon = new google.maps.LatLng(lat, lon);
		adicionarMarcador(gLatLon, etiqueta);
		if (marcadores.length > 1) {
			actualizarParadas();
		}
	}
}

function calcularDistancia(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  document.getElementById('distancia').innerHTML = total + ' Km';
}

function nuevaDireccion() {
// Copiar el frame
  $('#panel-A').clone().appendTo('#nuevosElementos').attr('id', 'panel-' + labels[cantDirecciones]);;
  // Cambia el label
  $('#nuevosElementos .panel-heading h3').last().text(labels[cantDirecciones]);
  // vacia el input y cambia el id
  $('#nuevosElementos #ubicacion-A').last().val("").attr('id','ubicacion-' + labels[cantDirecciones]);
  $('#nuevosElementos #referencias-A').last().val("").attr('id', 'referencias-' + labels[cantDirecciones]);
  $('#nuevosElementos #instrucciones-A').last().val("").attr('id', 'instrucciones-' + labels[cantDirecciones]);
  $('#nuevosElementos #boton-gps-A').last().attr('id', 'boton-gps-'+ labels[cantDirecciones]);
  //$('#nuevosElementos #panel-A').last().attr('id', 'panel-' + labels[cantDirecciones]);
  //muestra la flechita x
  $('.panel-body #close-A').removeClass('hidden');
  $('.panel-body #close-B').removeClass('hidden');
  $('#nuevosElementos .panel-body #close-A').attr('id', 'close-' + labels[cantDirecciones]).removeClass('hidden');
  $('#nuevosElementos .panel-body #close-' + labels[cantDirecciones]).attr("onclick", "eliminarDireccion('" + labels[cantDirecciones] + "')");
  // cambia los parametros onkeypress
  $('#nuevosElementos .panel-body #ubicacion-' + labels[cantDirecciones]).attr({"onkeypress": "buscarUbicacion(event, '"+ labels[cantDirecciones] +"')", "onclick": "verificarError('"+ labels[cantDirecciones] +"')"});
  $('#nuevosElementos .panel-body #referencias-' + labels[cantDirecciones]).attr("onclick", "verificarError('"+ labels[cantDirecciones] +"')");
  $('#nuevosElementos .panel-body #instrucciones-' + labels[cantDirecciones]).attr("onclick", "verificarError('"+ labels[cantDirecciones] +"')");
  $('#nuevosElementos .panel-body #boton-gps-' + labels[cantDirecciones]).attr("onclick", "myGeolocation('"+ labels[cantDirecciones] +"')");
  //Cambiar lo onclick
  inicializarPrediccion(labels[cantDirecciones]);
  cantDirecciones++;
}

function adicionarMarcador(latLon, label) {
	var marker;
	var infowindow = new google.maps.InfoWindow();
	if (null == existeMarcador(label)) {
      marker = new google.maps.Marker({
      position: latLon,
      map: gMap,
      draggable: true,
      label: label
    });
    infowindow.setContent('<div><h3>Recuerda</h3><strong>Puedes Moverme</strong> hasta la ubicación más adecuada.' );
    infowindow.open(gMap, marker);
    marcadores.push(marker);
    marker.addListener('dragend', function() {
    	direccionEscrita(marker);
    	if (marcadores.length > 1) {
    		actualizarParadas();
    	}
    });
	} else {
		marker = existeMarcador(label);
		marker.setPosition(latLon);
	}

	if (marcadores.length == 1) {
    	var objConfig = {
			zoom: 15,
			center: latLon
		}
		gMap.setOptions(objConfig);
	}
  direccionEscrita(marker);
}

function direccionEscrita(marcador) {
  var geocoder = new google.maps.Geocoder();
  var dir = document.getElementById("ubicacion-" + marcador.label);
  geocoder.geocode({ 'latLng': marcador.position }, function (results, status) {
  	if (status == google.maps.GeocoderStatus.OK) {
  		if (results[1]) {
  			dir.value = results[0].formatted_address;
      }
  	}
  });
}

function actualizarParadas() {
	if (marcadores.length > 2) {
		var paradasArray = [];
  	for (var i = 1; i < marcadores.length; i++) {
  		var puntos = {
  			location: marcadores[i].position
  		}
  		paradasArray[i - 1] = puntos;
  	}
  	dibujarRuta(marcadores[0].position, paradasArray, marcadores[marcadores.length - 1].position, directionsService, directionsDisplay);
	} else if (marcadores.length == 2) {
		dibujarRuta(marcadores[0].position, null, marcadores[marcadores.length - 1].position, directionsService, directionsDisplay);
	}
}

function existeMarcador(markerLabel) {
	var mark = null;
	for (var i = 0; i < marcadores.length; i++) {
		if (marcadores[i].label == markerLabel) {
			mark = marcadores[i];
		}
	}
	return mark;
}

function dibujarRuta(origin, paradas, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    waypoints: paradas,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      alert('Ocurrio un error, por favor intentalo de nuevo o recarga la página ' + status);
    }
  });
}

function colocarMarcadores(map) {
  for (var i = 0; i < marcadores.length; i++) {
    marcadores[i].setMap(map);
  }
}

function obtenerPosicion(name) {
	var indexMark = -1;
  for (var i = 0; i < marcadores.length; i++) {
    if (marcadores[i].label == name) {
    	indexMark = i;
    }
  }
  return indexMark;
}

function actualizarMarcadores(pos) {
	for (var i = pos; i < marcadores.length - 1; i++) {
		marcadores[i].position = marcadores[i + 1].position;
		direccionEscrita(marcadores[i]);
	}
	marcadores.length = marcadores.length - 1;
}

function eliminarMarcador(name) {
 	var pos = obtenerPosicion(name);
 	colocarMarcadores(null);
 	if (pos == marcadores.length - 1) {
   	marcadores.pop();
 	} else {
 		actualizarMarcadores(pos);
 	}
 	colocarMarcadores(gMap);
 	actualizarParadas();
}

function eliminarDireccion(name) {
	if (cantDirecciones > 2) {
		$('#nuevosElementos #panel-' + labels[cantDirecciones - 1]).remove();
		if (null != existeMarcador(name)) {
			eliminarMarcador(name);
		}
		cantDirecciones--;
	} if (cantDirecciones == 2) {
		$('.panel-body #close-A').addClass('hidden');
  	$('.panel-body #close-B').addClass('hidden');
	}
}

function programarServicio() {
  if (false == servicioProgramado) {
    $('#fecha-hora').removeClass('hidden');
    $('#btn-programarS').html('<i class="fa fa-calendar fa-lg" aria-hidden="true"></i> Cancelar Programación <i class="fa fa-caret-up" aria-hidden="true"></i>');
    servicioProgramado = true;
  } else {
    $('#fecha-hora').addClass('hidden');
    $('#btn-programarS').html('<i class="fa fa-calendar fa-lg" aria-hidden="true"></i> Programar Servicio <i class="fa fa-caret-down" aria-hidden="true"></i>');
    servicioProgramado = false;
  }
}

function confirmarServicio() {
  var confirmar = true;
  var result = "";
  if (cantDirecciones != marcadores.length) {
    result = '<div class="alert alert-dismissible alert-danger">'
    result += '<button type="button" class="close" data-dismiss="alert">&times;</button>'
    result += '<strong>ERROR: </strong>Es importante que esten los marcadores en el mapa.'
    result += '</div>'
    __('_error_marcadores_').innerHTML = result;
  }
	for (var i = 0; i < cantDirecciones; i++) {
		var u = document.getElementById("ubicacion-" + labels[i]).value.trim();
		var r = document.getElementById("referencias-" + labels[i]).value.trim();
		var ins = document.getElementById("instrucciones-" + labels[i]).value.trim();
		if (u == "" || r == "" || ins == "") {
      confirmar = false;
      marcarError(labels[i]);
		}
	}
	if (confirmar) {
      __('_error_campos_').innerHTML = "";
      __('_error_marcadores_').innerHTML = "";
      __('_titulo_confirmar_').innerHTML = "Confirmar Servicio";
	} else {
    result = '<div class="alert alert-dismissible alert-danger">'
    result += '<button type="button" class="close" data-dismiss="alert">&times;</button>'
    result += '<strong>ERROR: </strong>Todos los campos deben estar llenos.'
    result += '</div>'
    __('_error_campos_').innerHTML = result;
    __('_titulo_confirmar_').innerHTML = "Verifica algunos detalles";
  }
}

function marcarError(label) {
  $('#panel-' + label).addClass('panel-error');
  $('#panel-' + label + ' .panel-heading').addClass('heading-error');
}

function verificarError(name) {
  if ($('#panel-' + name).hasClass('panel-error')) {
    $('#panel-' + name).removeClass('panel-error');
    $('#panel-' + name + ' .panel-heading').removeClass('heading-error');
  }
}
