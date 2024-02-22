<?php require_once('../html/head2.php')  ?>
<script defer src="face-api.min.js"></script>
<!--https://www.youtube.com/watch?v=yBgXx0FLYKc&ab_channel=Computervisionengineer Reconocimiento facial -->
<!-- Basic Bootstrap Table -->
<div class="card">
    <button type="button" class="btn btn-outline-secondary" onclick="sucursales(); roles()" data-bs-toggle="modal" data-bs-target="#ModalUsuarios">Nuevo Usuario</button>


    <h5 class="card-header">Lista de Usuarios</h5>
    <div class="table-responsive text-nowrap">
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Sede</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody class="table-border-bottom-0" id="ListaUsuarios">

            </tbody>
        </table>
    </div>
</div>


<!-- Modal Usuarios-->

<div class="modal" tabindex="-1" id="ModalUsuarios">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloModal"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form id="form_usuarios" method="post">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="Nombres">Cedula</label>
                        <input type="text" name="Cedula" id="Cedula" class="form-control" placeholder="Ingrese su Cedula" require>
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Nombres</label>
                        <input type="text" name="Nombres" id="Nombres" class="form-control" autocomplete="Nombres" placeholder="Ingrese sus nombres" require>
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Apelldios</label>
                        <input type="text" name="Apellidos" id="Apellidos" class="form-control" placeholder="Ingrese sus apellidos" require>
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Sede</label>
                        <select id="SucursalId" name="SucursalId" class="form-control">
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Rol</label>
                        <select id="RolId" name="RolId" class="form-control">
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Correo Electrónico</label>
                        <input type="email" name="Correo" id="Correo" class="form-control" autocomplete="Correo" placeholder="Ingrese su Correo" require>
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Contraseña</label>
                        <input type="password" name="contrasenia" id="contrasenia" class="form-control" placeholder="**********" require autocomplete="current-password">

                    </div>
                    <div class="form-group">
                        <video id="video2"  autoplay ></video>
                        <br>
                        <button id="btnCamera" type="button" class="btn btn-secondary" >Acceder a la cámara</button>
                        <button id="btnCapturar" type="button" class="btn btn-success" style="display: none;">Capturar Imagen</button>
                       <!-- <video id="video" style="display: none;"></video> style="position: absolute; top:0px"-->
                        
                        <video id="video3" autoplay></video>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <button id=btnCerrar type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </form>
        </div>
    </div>
</div>






<?php require_once('../html/scripts2.php') ?>

<script src="./script.js"></script>
<script src="./usuarios.js"></script>


