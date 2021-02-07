import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PersistenceService {

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error when saving to local storage ', e);
    }
  }

  get(key: string): any {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Error when fetching from local storage ', e);
      return null;
    }
  }
}
