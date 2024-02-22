<?php require_once('../html/head2.php')  ?>

<!-- Basic Bootstrap Table -->
<div class="card">
    <button type="button" class="btn btn-outline-secondary"  data-bs-toggle="modal" data-bs-target="#ModalSucursales">Nueva sucursal</button>


    <h5 class="card-header">Lista de Sucursal</h5>
    <div class="table-responsive text-nowrap">
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombres</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Parroquia</th>
                    <th>Canton</th>
                    <th>Provincia</th>
                </tr>
            </thead>
            <tbody class="table-border-bottom-0" id="ListaSucursales">

            </tbody>
        </table>
    </div>
</div>


<!-- Modal Usuarios-->

<div class="modal" tabindex="-1" id="ModalSucursales">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloModal"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form id="form_sucursales" method="post">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="Nombres">Nombres</label>
                        <input type="text" name="Nombre" id="Nombre" class="form-control" placeholder="Ingrese sus nombres" require>
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Dirección</label>
                        <input type="text" name="Direccion" id="Direccion" class="form-control" placeholder="Ingrese su direccion" require>
                    
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Telefono</label>
                        <input type="text" name="Telefono" id="Telefono" class="form-control" placeholder="Ingrese su telefono" require>
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Correo Electrónico</label>
                        <input type="email" name="Correo" id="Correo" class="form-control" placeholder="Ingrese su Correo" require>
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Parroquia</label>
                        <input type="text" name="	Parroquia" id="	Parroquia" class="form-control" placeholder="Ingrese su Parroquia" require>
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Cantón</label>
                        <input type="text" name="	Canton" id="	Canton" class="form-control" placeholder="Ingrese su Cantón" require>
                    </div>
                    <div class="form-group">
                        <label for="Nombres">Provincia</label>
                        <input type="text" name="	Provincia" id="	Provincia" class="form-control" placeholder="Ingrese su Provincia" require>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </form>
        </div>
    </div>
</div>






<?php require_once('../html/scripts2.php') ?>

<script src="./sucursales.js"></script>

