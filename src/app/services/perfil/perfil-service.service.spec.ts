import { TestBed, inject } from '@angular/core/testing';

import { PerfilService } from './perfil-service.service';

describe('PerfilServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfilService]
    });
  });

  it('should be created', inject([PerfilService], (service: PerfilService) => {
    expect(service).toBeTruthy();
  }));
});
