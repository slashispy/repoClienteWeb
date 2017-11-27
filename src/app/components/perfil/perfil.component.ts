import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PerfilService } from '../../services/perfil/perfil-service.service';
import { Perfil } from '../../classes/perfil';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  allProfiles: Perfil[];
  statusCode: number;
  requestProcessing = false;
  profileIdToUpdate = null;
  processValidation = false;

  profileForm = new FormGroup({
    codigo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    estado: new FormControl('',Validators.required),
  });


  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.getAllProfiles();
  }

  getAllProfiles(){
    this.perfilService.getAllProfiles()
    .subscribe(
      data => this.allProfiles = data,
      errorCode => this.statusCode = errorCode
    );
  }

  onProfileFormSubmit(){
    this.processValidation = true;
    if (this.profileForm.invalid){
      return;
    }

    this.preProcessConfiguration();
    let profile = this.profileForm.value;
    if (this.profileIdToUpdate === null){
      this.perfilService.createProfile(profile)
      .subscribe(successCode =>{
        this.statusCode = successCode;
        this.getAllProfiles();
        this.backToCreateProfile();
      },
      errorCode => this.statusCode = errorCode
    );
    } else {
      profile.id = this.profileIdToUpdate;
      this.perfilService.updateProfile(profile)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllProfiles();
        this.backToCreateProfile();
      },
      errorCode => this.statusCode = errorCode);
    }
  }

  loadProfileToEdit(profileId: string){
    this.preProcessConfiguration();
    this.perfilService.getProfileById(profileId)
    .subscribe( profile => {
      this.profileIdToUpdate = profile.id;
      this.profileForm.setValue({codigo: profile.codigo,
                                descripcion: profile.descripcion,
                                estado: profile.estado
                              });
      this.processValidation = true;
      this.requestProcessing = false;
    },
    errorCode => this.statusCode = errorCode);
  }

  deleteProfile(profileId: string) {
    this.preProcessConfiguration();
    this.perfilService.deleteProfileById(profileId)
    .subscribe(succesCode =>{
      this.statusCode = 204;
      this.getAllProfiles();
      this.backToCreateProfile();
    },
    errorCode => this.statusCode = errorCode);
  }

  preProcessConfiguration(){
    this.statusCode = null;
    this.requestProcessing = null;
  }

  backToCreateProfile(){
    this.profileIdToUpdate = null;
    this.profileForm.reset();
    this.processValidation = false;
  }
}
