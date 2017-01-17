function goLogin() {
  var connect, form, response, result, email, pass, sesion;
  email = __('email_login').value;
  pass = __('pass_login').value;
  sesion = __('sesion_login').checked ? true : false;

  if (email != "" && pass != "") {
    form = 'email=' + email + '&pass=' + pass + '&sesion=' + sesion;
    connect = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    connect.onreadystatechange = function() {
      if (connect.readyState == 4 && connect.status == 200) {
        if (connect.responseText == 1) {
          result = '<div class="alert alert-dismissible alert-success">';
      		result += '<h4>Conectado!</h4>';
      		result += '<p><strong>Estamos redireccionandote...</strong></p>';
    	    result += '</div>';
          __('_AJAX_LOGIN_').innerHTML = result;
          location.reload();
        } else {
          __('_AJAX_LOGIN_').innerHTML = connect.responseText;
        }
      } else if (connect.readyState != 4) {
        result = '<div class="alert alert-dismissible alert-warning">';
    		result += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
    		result += '<h4>Procesando...</h4>';
    		result += '<p><strong>Iniciando sesión...</strong></p>';
  	    result += '</div>';
        __('_AJAX_LOGIN_').innerHTML = result;
      }
    }
    connect.open('POST', 'ajax.php?mode=login', true);
    connect.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    connect.send(form);
  } else {
    result = '<div class="alert alert-dismissible alert-danger">'
    result += '<button type="button" class="close" data-dismiss="alert">&times;</button>'
    result += '<strong>ERROR: </strong>Todos los campos deben estar llenos.'
    result += '</div>'
    __('_AJAX_LOGIN_').innerHTML = result;
  }
}

function runScriptLogin(e) {
  if (e.keyCode == 13) {
    goLogin();
  }
}
