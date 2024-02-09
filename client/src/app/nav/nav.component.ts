import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of, throwIfEmpty } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={};
  username:string="";
  
  constructor(public accountService:AccountService, private router:Router ,private toastr: ToastrService)  {}
  ngOnInit(): void {
    console.log(this.accountService.currentUser$.subscribe(res => console.log(res)
    ));
    console.log("inside nav");

    
  }
  
  ngOnChanges(){ 
    console.log(this.accountService.currentUser$);
    

  }
  // console.log();
  
  
  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => this.toastr.error(error.error)
    })
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
