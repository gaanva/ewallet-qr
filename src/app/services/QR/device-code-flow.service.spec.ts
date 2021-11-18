import { TestBed } from '@angular/core/testing';

import { DeviceCodeFlowService } from './device-code-flow.service';

describe('DeviceCodeFlowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceCodeFlowService = TestBed.get(DeviceCodeFlowService);
    expect(service).toBeTruthy();
  });
});
