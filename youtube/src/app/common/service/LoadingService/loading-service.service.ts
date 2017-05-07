import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  loading: boolean = false;
  constructor() { }

  toggleLoading() {
    this.loading = !this.loading;
  }
}
