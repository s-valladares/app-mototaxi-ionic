import { TestBed } from '@angular/core/testing';

import { PilotosService } from './pilotos.service';

describe('PilotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PilotosService = TestBed.get(PilotosService);
    expect(service).toBeTruthy();
  });
});
