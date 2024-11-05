import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading = false;

  // Show loader
  show() {
    this.loading = true;
  }

  // Hide loader
  hide() {
    this.loading = false;
  }

  // Get loader status
  getStatus() {
    return this.loading;
  }

}
