import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Perfil } from 'app/classes/perfil';

@Injectable()
export class PerfilService {
  perfilURL = "http://localhost:8090/rest.api/perfil/";  
  
  constructor(private http: Http) { }

  getAllProfiles(): Observable <Perfil[]> {
    return this.http.get(this.perfilURL)
    .map(this.extractData)
    .catch(this.handleError);

  }

  createProfile(perfil: Perfil): Observable<number> {
    let cpHeaders = new Headers({'Content-type' : 'application/json'});
    let options = new RequestOptions({headers : cpHeaders});
    return this.http.post(this.perfilURL, perfil, options)
    .map(succes => succes.status)
    .catch(this.handleError);
  }

  getProfileById(profileId : string ): Observable<Perfil> {
    let cpHeaders = new Headers({'Content-type' : 'application/json'});
    let options = new RequestOptions({headers : cpHeaders});
    console.log(this.perfilURL + profileId);
    return this.http.get(this.perfilURL + profileId)
    .map(this.extractData)
    .catch(this.handleError);
  }

  updateProfile(profile: Perfil): Observable<number> {
    let cpHeaders = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers : cpHeaders});
    return this.http.put(this.perfilURL + profile.id, profile, options)
    .map(success => success.status)
    .catch(this.handleError);
  }

  deleteProfileById(profileId: string): Observable<number> {
    return this.http.delete(this.perfilURL + profileId)
    .map( success => success.status)
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
