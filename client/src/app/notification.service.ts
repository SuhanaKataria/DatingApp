import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notificationSubject = new Subject<string>();
  public notificationSubject2 = new BehaviorSubject<string>("Greetings from Suhana");
  constructor() { }
  sendNotification(data: string){
    this.notificationSubject.next(data);
  }
  sendNotification2(data: string){
    this.notificationSubject2.next(data);
  }
}
