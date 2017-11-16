import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Usuario } from 'app/classes/usuario';

@Injectable()
export class UsuarioService {
  usuarioUrl = "http://localhost:8090/rest.api/usuarios/";

  constructor(private http: Http) { }

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get(this.usuarioUrl)
    .map(this.extractData)
    .catch(this.handleError);
  }

  createUser(usuario: Usuario): Observable<number> {
    let cpHeaders = new Headers({'Content-type' : 'application/json'});
    let options = new RequestOptions({headers : cpHeaders});
    return this.http.post(this.usuarioUrl, usuario, options)
    .map(succes => succes.status)
    .catch(this.handleError);
  }

  private extractData(res: Response | any) {
    let body = res.json();
    return body;
  }

  private handleError(error: Response |any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
