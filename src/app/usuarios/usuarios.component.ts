import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from '../services/usuario-service.service';
import { Usuario } from '../classes/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  allUsers: Usuario[];
  statusCode: number;
  requestProcessing = false;
  userIdToUpdate = null;
  processValidation = false;

  userForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
  });

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usuarioService.getAllUsers()
    .subscribe(
      data => this.allUsers = data,
      errorCode => this.statusCode = errorCode
    );
  }

  onUserFormSubmit() {
    this.processValidation = true;
    if (this.userForm.invalid) {
      return; // Validacion fallida, salida del metodo.
    }
	  // formulario es valido, haremos una creacion or actualizacion
    this.preProcessConfigurations();
    let user = this.userForm.value;
    if (this.userIdToUpdate === null) {
	    // Generados usuario id y creamos el usuario
            this.usuarioService.getAllUsers()
            .subscribe(users => {
		   // Generamos id
      let maxIndex = users.length - 1;
      let userWithMaxIndex = users[maxIndex];
      let userId = userWithMaxIndex.id + 1;
      user.id = userId;
		   // Creamos usuario
      this.usuarioService.createUser(user)
      .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllUsers();
          this.backToCreateUser();
      },
        errorCode => this.statusCode = errorCode
        );
      });
    } else {
   	     //  actualizamos usuario
        user.id = this.userIdToUpdate;
        this.usuarioService.updateUser(user)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllUsers();
          this.backToCreateUser();
    },
        errorCode => this.statusCode = errorCode);
    }
  }

  loadUserToEdit(userId: string){
    this.preProcessConfigurations();
    this.usuarioService.getUserById(userId)
    .subscribe(usuario => {
      this.userIdToUpdate = usuario.id;
      this.userForm.setValue({nombre: usuario.nombre,
                              apellido: usuario.apellido,
                              email: usuario.email,
                              usuario: usuario.usuario,
                              clave: usuario.clave,
                              estado: usuario.estado
                              });
      this.processValidation = true;
      this.requestProcessing = false;
    },
    errorCode => this.statusCode = errorCode);
  }

  deleteUser(userId: string) {
    this.preProcessConfigurations();
    this.usuarioService.deleteUserById(userId)
    .subscribe(successCode => {
      this.statusCode = 204;
      this.getAllUsers();
      this.backToCreateUser();
    },
  errorCode => this.statusCode = errorCode);
  }

  // Configuraciones preliminares
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  backToCreateUser() {
    this.userIdToUpdate = null;
    this.userForm.reset();
    this.processValidation = false;
 }

}
