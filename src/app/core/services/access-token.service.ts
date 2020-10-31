import { Injectable } from '@angular/core';

@Injectable()
export class AccessTokenService {
  private jwtTokenExists(): boolean {
    const accessToken = localStorage.getItem('access-token');

    return typeof accessToken !== 'undefined' && accessToken !== null && accessToken.length > 0;
  }

  public isLoggedIn(): boolean {
    return this.jwtTokenExists();
  }

  public storeJWTToken(token: string): void {
    localStorage.setItem('access-token', token);
  }

  public getJWTToken(): string {
    return localStorage.getItem('access-token');
  }

  public clearStorage(): void {
    localStorage.removeItem('access-token');
  }
}
