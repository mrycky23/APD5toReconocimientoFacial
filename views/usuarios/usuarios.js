function init() {
  $("#form_usuarios").on("submit", (e) => {
    GuardarEditar(e);
  });
}

$().ready(() => {
  CargaLista();
});

var CargaLista = () => {
  var html = "";
  $.get(
    "../../controllers/usuario.controllers.php?op=todos",
    (ListUsuarios) => {
      ListUsuarios = JSON.parse(ListUsuarios);
      $.each(ListUsuarios, (index, usuario) => {
        html += `<tr>
            <td>${index + 1}</td>
            <td>${usuario.Nombres}</td>
            <td>${usuario.Apellidos}</td>
            <td>${usuario.Rol}</td>
            <td>${usuario.Nombre}</td>
<td>
<button class='btn btn-primary' click='uno(${
          usuario.idUsuarios
        })'>Editar</button>
<button class='btn btn-warning' click='eliminar(${
          usuario.idUsuarios
        })'>Editar</button>
            `;
      });
      $("#ListaUsuarios").html(html);
    }
  );
};

var GuardarEditar = (e) => {
  e.preventDefault();
  var DatosFormularioUsuario = new FormData($("#form_usuarios")[0]);
  var accion = "../../controllers/usuario.controllers.php?op=insertar";

  for (var pair of DatosFormularioUsuario.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  /**
   * if(SucursalId >0){editar   accion='ruta para editar'}
   * else
   * { accion = ruta para insertar}
   */
  $.ajax({
    url: accion,
    type: "post",
    data: DatosFormularioUsuario,
    processData: false,
    contentType: false,
    cache: false,
    success: (respuesta) => {
      console.log(respuesta);
      respuesta = JSON.parse(respuesta);
      if (respuesta == "ok") {
        alert("Se guardo con éxito");
        CargaLista();
        LimpiarCajas();
      } else {
        alert("no tu pendejada");
      }
    },
  });
};

var uno = () => {};

var sucursales = () => {
  return new Promise((resolve, reject) => {
    var html = `<option value="0">Seleccione una opción</option>`;
    $.post(
      "../../controllers/sucursal.controllers.php?op=todos",
      async (ListaSucursales) => {
        ListaSucursales = JSON.parse(ListaSucursales);
        $.each(ListaSucursales, (index, sucursal) => {
          html += `<option value="${sucursal.SucursalId}">${sucursal.Nombre}</option>`;
        });
        await $("#SucursalId").html(html);
        resolve();
      }
    ).fail((error) => {
      reject(error);
    });
  });
};

var roles = () => {
  return new Promise((resolve, reject) => {
    var html = `<option value="0">Seleccione una opción</option>`;
    $.post(
      "../../controllers/rol.controllers.php?op=todos",
      async (ListaRoles) => {
        ListaRoles = JSON.parse(ListaRoles);
        $.each(ListaRoles, (index, rol) => {
          html += `<option value="${rol.idRoles}">${rol.Rol}</option>`;
        });
        await $("#RolId").html(html);
        resolve();
      }
    ).fail((error) => {
      reject(error);
    });
  });
};

var eliminar = () => {};

var LimpiarCajas = () => {
  (document.getElementById("Nombres").value = ""),
    (document.getElementById("Apellidos").value = ""),
    (document.getElementById("Correo").value = ""),
    (document.getElementById("contrasenia").value = ""),
    $("#ModalUsuarios").modal("hide");
};
init();

// JavaScript para controlar el video
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video2");
  const modalDialog = document.querySelector(".modal-dialog");
  const btnCamera = document.getElementById("btnCamera");
  const btnCerrar = document.getElementById("btnCerrar");
  const btnCapturar = document.getElementById("btnCapturar");

  
  let mediaStream;

  btnCamera.addEventListener('click', function () {
      // Mostrar el elemento de video y acceder a la cámara
      video.style.display = 'block';
      btnCapturar.style.display='block';
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
              mediaStream = stream;
              video.srcObject = mediaStream;
              // Ajustar el tamaño del video al tamaño del modal
              video.addEventListener('loadedmetadata', function () {
                  const aspectRatio = this.videoWidth / this.videoHeight;
                  const maxHeight = modalDialog.clientHeight - 50; // 100px de espacio adicional
                  const maxWidth = modalDialog.clientWidth - 50; // 100px de espacio adicional

                  if (aspectRatio > (maxWidth / maxHeight)) {
                      this.width = maxWidth;
                      this.height = maxWidth / aspectRatio;
                  } else {
                      this.height = maxHeight;
                      this.width = maxHeight * aspectRatio;
                  }
              });
          })
          .catch(function (error) {
              console.log('Error al acceder a la cámara: ', error);
          });
  });

  btnCerrar.addEventListener('click', function () {
      // Detener el flujo de la cámara y ocultar el video
      if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
      }
      video.style.display = 'none';
  });
});

btnCapturar.addEventListener('click', function () {
  // Capturar imagen y enviarla a la base de datos
  const video = document.getElementById("video2");
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/png');
  
  // Aquí debes enviar imageData a tu servidor para guardarla en la base de datos
  console.log('Imagen capturada:', imageData);
});
