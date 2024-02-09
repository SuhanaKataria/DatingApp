import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnChanges{
  @Input()  item : any;
  notificationMessage : string | undefined;
  notificationMessage2 :string | undefined;
  @Output() cancelRegister =new EventEmitter;

  model: any={}

  constructor(private accountService: AccountService , private toastr:ToastrService,private notificationS: NotificationService){ }

  ngOnInit(): void {
    
    this.notificationS.notificationSubject.subscribe(d=>{
     this.notificationMessage=d;
    })
    this.notificationS.notificationSubject2.subscribe(d=>{
      this.notificationMessage2=d;
     })
  }
ngOnChanges(changes: SimpleChanges): void {
  console.log("Onchanges resgister");
}
  register(){
    this.accountService.register(this.model).subscribe({
      next:()=>{
        this.cancel();
      },
      error: error=> {
        this.toastr.error(error.error),
        console.log(error)}
    })
  }
  
  cancel(){
    this.cancelRegister.emit(false);
  }
 
  
}
