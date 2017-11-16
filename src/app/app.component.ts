import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Modulo Administrativo!';
  private apiUrl = 'http://localhost:8090/rest.api/usuario/';
  data: any = {};
  
  constructor(private http: Http){
    console.log('Hola compañero');
    this.getContacts();
    this.getData();
  }
  
  getData(){
    return this.http.get(this.apiUrl)
    .map((res: Response) => res.json())
  }
  
  getContacts(){
    this.getData().subscribe(data => {
        console.log(data);
        this.data = data
    })
  }
}
