function init() {
  $("#frm").on("submit", (e) => {
    RegistroAsistencia(e);
  });
}

$().ready(() => {
  tiposacceso();
});

var RegistroAsistencia = (e) => {
  e.preventDefault();
  var formulario = new FormData($("#frm")[0]);
  alert("Registro de asistencia exitoso");
  $.ajax({
    url: "controllers/usuario.controllers.php?op=unoconCedula",
    type: "post",
    data: formulario,
    processData: false,
    contentType: false,
    cache: false,
    success: (respuesta) => {
      console.log(respuesta);
    },
  }).done((usuarioId) => {
    usuarioId = JSON.parse(usuarioId);
    formulario.append("usuariosId", usuarioId.idUsuarios);
    $.ajax({
      url: "controllers/accesos.controllers.php?op=insertar",
      type: "post",
      data: formulario,
      processData: false,
      contentType: false,
      cache: false,
      success: (respuesta) => {
        console.log(respuesta);
        respuesta = JSON.parse(respuesta);
        if (respuesta == "ok") {
          //Swal.fire(Titulo, texto, tipo de alerta)
          Swal.fire("Registro de Asistencia", "Se guardo con éxito", "success");
        } else {
          Swal.fire(
            "Registro de Asistencia",
            "Hubo un error al guardar",
            "danger"
          );
        }
      },
    });
  });
};

var tiposacceso = () => {
  return new Promise((resolve, reject) => {
    var html = `<option value="0">Seleccione una opción</option>`;
    $.post("controllers/tipoacceso.controllers.php?op=todos", async (lista) => {
      lista = JSON.parse(lista);
      $.each(lista, (index, tipo) => {
        html += `<option value="${tipo.IdTipoAcceso}">${tipo.Detalle}</option>`;
      });
      await $("#tipo").html(html);
      resolve();
    }).fail((error) => {
      reject(error);
    });
  });
};
init();

document.addEventListener("DOMContentLoaded", (e) => {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  let stream;
  navigator.mediaDevices.getUserMedia({
      video: true,
    })
    .then((mediaStream) => {
      stream = mediaStream;
      video.srcObject = mediaStream;
    })
    .catch((error) => {
      alert("Error al acceder a la camara web");
    });

});
