function init() {
    $("#form_sucursales").on("submit", (e) => {
      GuardarEditar(e);
    });
  }
  
  $().ready(() => {
    CargaLista();
  });
  
  var CargaLista = () => {
    var html = "";
    $.get(
      "../../controllers/sucursal.controllers.php?op=todos",
      (ListaSucursales) => {
        ListaSucursales = JSON.parse(ListaSucursales);
        $.each(ListaSucursales, (index, sucursal) => {
          html += `<tr>
          <td>${index + 1}</td>
          <td>${sucursal.Nombre}</td>
          <td>${sucursal.Direccion}</td>
          <td>${sucursal.Telefono}</td>
          <td>${sucursal.Correo}</td>
          <td>${sucursal.Parroquia}</td>
          <td>${sucursal.Canton}</td>
          <td>${sucursal.Provincia}</td>
  <td>
  <button class='btn btn-primary' click='uno(${
            sucursal.SucursalId
          })'>Editar</button>
  <button class='btn btn-warning' click='eliminar(${
    sucursal.SucursalId
          })'>Eliminar</button>
              `;
        });
        $("#ListaSucursales").html(html);
      }
    );
  };
  
  var GuardarEditar = (e) => {
    e.preventDefault();
    var DatosFormularioSucursales = new FormData($("#form_sucursales")[0]);
    var accion = "../../controllers/sucursal.controllers.php?op=insertar";
  
    for (var pair of DatosFormularioSucursales.entries()) {
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
      data: DatosFormularioSucursales,
      processData: false,
      contentType: false,
      cache: false,
      success: (respuesta) => {
        console.log(respuesta);
        if (respuesta.trim() !== "") {
          try {
            respuesta = JSON.parse(respuesta);
            if (respuesta === "ok") {
              alert("Se guardó con éxito");
              CargaLista();
              LimpiarCajas();
            } else {
              alert("Algo salió mal");
            }
          } catch (error) {
            console.error("Error al analizar la respuesta JSON:", error);
            alert("Error al procesar la respuesta del servidor");
          }
        } else {
          console.error("La respuesta del servidor está vacía");
          alert("La respuesta del servidor está vacía");
        }
      },
      /*success: (respuesta) => {
        console.log(respuesta);
        respuesta = JSON.parse(respuesta);
        if (respuesta == "ok") {
          alert("Se guardo con éxito");
          CargaLista();
          LimpiarCajas();
        } else {
          alert("no tu pendejada");
        }
      },*/
    });
  };
  
  
  
  var eliminar = () => {};
  
  var LimpiarCajas = () => {
    (document.getElementById("SucursalId").value = ""),
      (document.getElementById("Nombre").value = ""),
      (document.getElementById("Direccion").value = ""),
      (document.getElementById("Telefono").value = ""),
      (document.getElementById("Correo").value = ""),
      (document.getElementById("Parroquia").value = ""),
      (document.getElementById("Canton").value = ""),
      (document.getElementById("Provincia").value = ""),
      $("#ModalSucursales").modal("hide");
  };
  init();
  