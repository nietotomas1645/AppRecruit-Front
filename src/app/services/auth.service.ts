import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private baseUrl:string="https://localhost:7168/api/User/"
  
  constructor(private http: HttpClient, private router: Router) { }

// ------------------ REGISTER SERVICE -------------------------------
  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }

// ------------------ LOGIN SERVICE -------------------------------
  login(loginObj: any){
    this.isLoggedInSubject.next(true);
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
    
    
  }
  
// ------------------ SIGNOUT SERVICE -------------------------------
  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
    this.isLoggedInSubject.next(false);
    
  }

// ----------------- TOKEN SERVICES -------------------------------
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')    
  }
}
