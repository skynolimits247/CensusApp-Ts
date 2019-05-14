import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserServiceService } from '../../Services/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthUser } from '../../models/usermodel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseService } from '../../Services/house.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //myForm : FormGroup , private fb: FormBuilder
  error:boolean=false;
  
  user:AuthUser
  constructor(private userservice: UserServiceService,private router : Router, private houseservice:HouseService) { }

  ngOnInit() {
                 if(localStorage.getItem('userRoles') as string === "True"){
                     console.log("user approver")
                      this.router.navigate(['/approver']);
                  }
                  if(localStorage.getItem('userRoles') as string === "False"){
                      if(localStorage.getItem('userstatus') as string === "Approved"){
                             console.log("user approved normal")
                             this.router.navigate(['/user']);
                      }
                      else if(localStorage.getItem('userstatus') as string === "Pending"){
                             console.log("user pending normal")
                             this.router.navigate(['/pending']);
                      }
                      else{
                             console.log("user pending normal")
                             this.router.navigate(['/rejected']);                        
                      }
                  }
  }
  onSubmit (myForm: NgForm){
    if(myForm.valid)
    {
        console.log(myForm.value.username+" "+myForm.value.password)
        this.userservice.userAuthentication(myForm.value.username, myForm.value.password)
        
        this.userservice.$isLoggedIn.subscribe((data : boolean) =>{
            if(data === true){
                this.user = {
                  userfname: localStorage.getItem("userfname"),
                  useremail: localStorage.getItem("useremail"),
                  userstatus: localStorage.getItem("userstatus"),
                  userRoles: localStorage.getItem("userRoles"),
                  }
                        if((localStorage.getItem("userRoles")) as String === 'True'){
                              console.log("Successfully logged in approver")
                              this.router.navigate(['/approver']);
                          }
                        if((localStorage.getItem("userRoles")) as String === 'False'){
                            if(localStorage.getItem('userstatus') as string === "Approved"){
                                    console.log("user approved normal")
                                    this.router.navigate(['/user']);
                            }
                            else if(localStorage.getItem('userstatus') as string === "Pending"){
                                    console.log("user pending normal")
                                    this.router.navigate(['/pending']);
                            }
                            else{
                                    console.log("user pending normal")
                                    this.router.navigate(['/rejected']);                        
                            }
                          }
                  
            }
            else{
                this.error=true
            }
        })
    }
      else
      {
        this.error=true;
      }
  }
}

