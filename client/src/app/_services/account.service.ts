import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl ='http://localhost:5000/api/';
  private currentUserSource=new BehaviorSubject<User | null>(null);
  currentUser$=this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }
  
  login(model:any){
    return this.http.post<User>(this.baseUrl+'account/login',model).pipe(
      map((response:User)=>{const user=response;
      if(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.currentUserSource.next(user);
        // console.log(this.currentUser$);
      }
      })
    )
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
      map(user=> {
        console.log("hello");
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          this.currentUserSource.next(user);
          console.log(this.currentUserSource);
        }
      
      })
      )
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }
 
  logout(){
    console.log("hi");
    
    localStorage.removeItem('user');
    this.currentUserSource.next(null);

  }
}
