import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private accessTokenSource = new BehaviorSubject<string>(null);
  currentAccessToken = this.accessTokenSource.asObservable();

  constructor() {}

  setAccessToken(token: string) {
    this.accessTokenSource.next(token);
  }
}
