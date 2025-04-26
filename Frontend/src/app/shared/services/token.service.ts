import { inject, Injectable } from '@angular/core';
import { JwtPayload } from '../../core/models/JwtPayload.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private ls = inject(LocalStorageService);

  GetId(): number {
    return Number.parseInt(this.GetTokenClaims().Id);
  }
  GetEmail(): string {
    return this.GetTokenClaims()[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
    ];
  }
  GetExpiration(): number {
    return this.GetTokenClaims().exp * 1000;
  }
  private GetTokenClaims(): JwtPayload {
    const token = this.ls.GetToken();
    if (!token) return null;
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }
}
