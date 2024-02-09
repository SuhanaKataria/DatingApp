import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
    currentMessage:string | undefined;
    currentMessage2:string | undefined;
    registerMode=false;
    users:any;
    Suhana="try";
    
    public suhanaSource =new BehaviorSubject<string | null>(null);
    suhana$=this.suhanaSource.asObservable();
    
    //Suhana="try";
    

    constructor(private http: HttpClient, private notificationS:NotificationService){
      
    }
    ngOnInit(): void {
      this.notificationS.notificationSubject.subscribe(d=>{
        this.currentMessage=d;
       
        
      })
      this.getUsers();
      this.notificationS.notificationSubject2.subscribe(d=>{
        this.currentMessage2=d;
      })
    }
    registerToggle(){
        this.registerMode=!this.registerMode;
    }
    
ngOnChanges(changes: SimpleChanges): void {
  console.log("Onchanges home");
}
    getUsers(){
      this.http.get("http://localhost:5000/api/users").subscribe({
        next :response =>this.users =response,
        error: error => console.log(error),
        complete:() => console.log('Request has completed')
    })
    }
    cancelRegisterMode(event:boolean){
    this.Suhana ="try";
    this.registerMode=event;
    }
    cv(){
      this.Suhana="Keep trying";
    }
      sendMessage(data: { value: string; }){
            this.notificationS.sendNotification(data.value)
      }
      sendMessage2(data: { value: string; }){
        this.notificationS.sendNotification2(data.value)

  }
    }

