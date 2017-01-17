function goReg() {
  var connect, form, response, result, nombre, apellido, email, celular, telefono, pass, pass_dos;
  nombre = __('nombre_reg').value;
  apellido = __('apellido_reg').value;
  email = __('email_reg').value;
  celular = __('celular_reg').value;
  telefono = __('telefono_reg').value;
  pass = __('pass_reg').value;
  pass_dos = __('pass_reg_dos').value;

  if (nombre != '' && apellido != '' && email != '' && celular != '' && pass != '' && pass_dos != '') {
    if (pass == pass_dos) {
      form = 'nombre=' + nombre + '&apellido=' + apellido +'&email=' + email + '&celular=' + celular
      + '&telefono=' + telefono +'&pass=' + pass;
      connect = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      connect.onreadystatechange = function() {
        if (connect.readyState == 4 && connect.status == 200) {
          if (connect.responseText == 1) {
            result = '<div class="alert alert-dismissible alert-success">';
        		result += '<h4>Registro completado!</h4>';
        		result += '<p><strong>Estamos redireccionandote...</strong></p>';
      	    result += '</div>';
            __('_AJAX_REG_').innerHTML = result;
            location.reload();
          } else {
            __('_AJAX_REG_').innerHTML = connect.responseText;
          }
        } else if (connect.readyState != 4) {
          result = '<div class="alert alert-dismissible alert-warning">';
      		result += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
      		result += '<h4>Procesando...</h4>';
      		result += '<p><strong>Estamos procesando tu regístro...</strong></p>';
    	    result += '</div>';
          __('_AJAX_REG_').innerHTML = result;
        }
      }
      connect.open('POST', 'ajax.php?mode=reg', true);
      connect.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      connect.send(form);
    } else {
      result = '<div class="alert alert-dismissible alert-danger">'
      result += '<button type="button" class="close" data-dismiss="alert">&times;</button>'
      result += '<strong>ERROR: </strong>Las contraseñas no coinciden.'
      result += '</div>';
      __('_AJAX_REG_').innerHTML = result;
    }
  } else {
    result = '<div class="alert alert-dismissible alert-danger">'
    result += '<button type="button" class="close" data-dismiss="alert">&times;</button>'
    result += '<strong>ERROR: </strong>Todos los campos obligatorios (*) deben estar llenos.'
    result += '</div>';
    __('_AJAX_REG_').innerHTML = result;
  }
}

function runScriptReg(e) {
  if (e.keyCode == 13) {
    goReg();
  }
}
