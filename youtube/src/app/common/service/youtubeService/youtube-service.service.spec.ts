import { TestBed, inject } from '@angular/core/testing';

import { YoutubeService } from './youtube-service.service';

describe('YoutubeServicee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YoutubeService]
    });
  });

  it('should ...', inject([YoutubeService], (service: YoutubeService) => {
    expect(service).toBeTruthy();
  }));
});
