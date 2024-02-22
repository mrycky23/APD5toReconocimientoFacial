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

// Función para enviar la imagen capturada al servidor
function enviarImagenBase64(imageData) {
  $.ajax({
      url: 'guardar_imagen.php',
      type: 'post',
      data: { imageData: imageData },
      success: function(response) {
          console.log(response);
          // Aquí puedes realizar cualquier otra acción después de guardar la imagen
      },
      error: function(xhr, status, error) {
          console.error('Error al enviar la imagen: ' + error);
      }
  });
}

let capturedImage = null;
let capturedImageFileName = '';

// Modificar la función btnCapturar para enviar la imagen al servidor
btnCapturar.addEventListener('click', function () {
  // Capturar imagen y enviarla a la base de datos
  const video = document.getElementById("video2");
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/png');
  
  capturedImage = imageData;
  capturedImageFileName = 'captured_image_'+ Date.now() + '.png';
  
  document.getElementById('capturedImagePreview').src = capturedImage;
  // Enviar la imagen capturada al servidor
  //console.log('Imagen capturada:', imageData);
  //enviarImagenBase64(imageData);
});

function guardarImagen() {
  if (capturedImage) {
      // Enviar la imagen al servidor
      $.ajax({
          url: 'guardar_imagen.php',
          type: 'post',
          data: { 
              imageData: capturedImage,
              fileName: capturedImageFileName // Enviar el nombre de archivo al servidor
          },
          success: function(response) {
              console.log(response);
              // Aquí puedes realizar cualquier otra acción después de guardar la imagen
              // Por ejemplo, cerrar el modal o actualizar la interfaz de usuario
          },
          error: function(xhr, status, error) {
              console.error('Error al enviar la imagen: ' + error);
          }
      });
  } else {
      console.error('No se ha capturado ninguna imagen.');
  }
}