import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean=false;
  constructor(private router : Router, private userservice: UserServiceService) { }

  ngOnInit() {
        if(localStorage.getItem('userToken') !== null){
            //console.log("logged in from header")
                this.isLoggedIn = true;
              }
       this.userservice.$isLoggedIn.subscribe((flag:any) =>{
        if(flag === true){
          //console.log("logged in flag from header")
          this.isLoggedIn = true;
        }
        else{
          //console.log("not logged in from header")
          this.isLoggedIn = false;
        }
      })
  }
    
  logOut(){
              localStorage.removeItem('userToken');
              localStorage.removeItem('userRoles');
              localStorage.removeItem('userstatus');
              localStorage.removeItem('useremail');
              localStorage.removeItem('userfname');
              this.isLoggedIn=false;
              this.router.navigate(['/login']);
  }
}
