/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppConfigurationService } from './app-configuration.service';

describe('AppConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppConfigurationService]
    });
  });

  it('should ...', inject([AppConfigurationService], (service: AppConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
