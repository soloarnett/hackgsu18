import { TestBed, inject } from '@angular/core/testing';

import { AboutWindowHandlerService } from './about-window-handler.service';

describe('AboutWindowHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutWindowHandlerService]
    });
  });

  it('should be created', inject([AboutWindowHandlerService], (service: AboutWindowHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
