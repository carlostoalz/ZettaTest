import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  SetToken(token: string): void {
    sessionStorage.setItem('Token', token);
  }

  GetToken(): string {
    return sessionStorage.getItem('Token');
  }

  DeleteToken(): void {
    sessionStorage.removeItem('Token');
  }
}
