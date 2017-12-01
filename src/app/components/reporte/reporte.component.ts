import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/usuarios/usuario-service.service';
import { UsuarioDto } from 'app/classes/usuario-dto';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  allUsersDTO: UsuarioDto[];
  allUsersActivos: UsuarioDto[];
  allUserInactivos: UsuarioDto[];
  statusCode: number;

  constructor(private usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.getReporte();
    this.getReporteActivos();
    this.getReporteInactivos();
  }

  getReporte() {
    this.usuarioService.getReporte()
    .subscribe(
      data => this.allUsersDTO = data,
      errorCode => this.statusCode = errorCode
    );
  }

  getReporteActivos() {
    this.usuarioService.getReporteActivos()
    .subscribe(
      data => this.allUsersActivos = data,
      errorCode => this.statusCode = errorCode
    );
  }

  getReporteInactivos() {
    this.usuarioService.getReporteInactivos()
    .subscribe(
      data => this.allUserInactivos = data,
      errorCode => this.statusCode = errorCode
    );
  }

}
