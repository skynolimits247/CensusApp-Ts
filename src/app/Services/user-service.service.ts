import { Injectable, EventEmitter, Component, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';
import{ SingupUser } from '../models/signupmodel';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  readonly rootUrl = 'http://localhost:60206';
  username:string;
  password:string;
  loginstatus:boolean=false;
  $isLoggedIn = new EventEmitter();
  $UsersList = new EventEmitter();
  constructor(private http: HttpClient) { }
  
  setData(username, password){
    this.password=password;
    this.username=username;
    this.userAuthentication(this.username, this.password)
  }

    userAuthentication(username, password) {
    var data = "username=" + username + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
     this.http.post(this.rootUrl + '/token', data).subscribe((res:any) =>{
       //console.log(res)
        if((res.Role) as String === 'True' || (res.Role) as String === 'False'){
                        localStorage.setItem('userToken',res.access_token);
                        localStorage.setItem('userRoles',res.Role);
                        localStorage.setItem('userstatus',res.Status);
                        localStorage.setItem('useremail',res.Email);
                        localStorage.setItem('userfname',res.FName);
                        localStorage.setItem('userid',res.Id);
                        this.loginstatus=true;    
        }else{
          this.loginstatus=false;
        }
          this.$isLoggedIn.emit(this.loginstatus);
          },(err : HttpErrorResponse)=>{
                    this.loginstatus = false;
                    this.$isLoggedIn.emit(this.loginstatus);
            })
        
  }

  createUser(usermodel: SingupUser){
      return this.http.post(this.rootUrl + '/api/user/signup', usermodel)
      }

    GetAllUser(){
      var token:string = localStorage.getItem('userToken')
     this.http.get(`${this.rootUrl}/api/user`, { headers:new HttpHeaders().append('Authorization', `Bearer ${token}`)})
     .subscribe((res: any) =>{
        this.$UsersList.emit(res);
     },(err : HttpErrorResponse)=>{
                    this.$UsersList.emit(null);
            })

    }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUserEmail(control.value.toLowerCase())
        .pipe(
          map((res:boolean) => {
            // if username is already taken
            if (res == true) {
              // return error
              return { 'userNameExists': true};
            }
          })
        );
    };

  }

  searchUserEmail(text) {
    // debounce
    return timer()
      .pipe(
        switchMap(() => {
          // Check if username is available
          return this.http.get<any>(`${this.rootUrl}/api/user/email?email=${text}`)
        })
      );
  }

  aadharValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUIDAI(control.value)
        .pipe(
          map((res:boolean) => {
            // if username is already taken
            if (res == true) {
              // return error
              return { 'aadharAlreadyExists': true};
            }
          })
        );
    };
  }

  searchUIDAI(text) {
    // debounce
    return timer()
      .pipe(
        switchMap(() => {
          // Check if username is available
          return this.http.get<any>(`${this.rootUrl}/api/user/uidai?uidai=${text}`)
        })
      );
  }
ApproveUser(userId:number){
  var token:string = localStorage.getItem('userToken')
  var approverId: string = localStorage.getItem('userid')
   this.http.put(`${this.rootUrl}/api/approve?userId=${userId}`,{ApproverId : approverId}, { headers:new HttpHeaders()
    .append('Authorization', `Bearer ${token}`)}).subscribe((res:boolean) => {
          console.log("res = ", res)
            if(res == true)
              {
                  //console.log("successfull....!!")
                  this.GetAllUser()
              }
            else
              {
                  //console.log("something went wrong....!!")
                  this.GetAllUser()
              }
        })
      }

RejectUser(userId:number){
  var token:string = localStorage.getItem('userToken')
  var approverId: string = localStorage.getItem('userid')
   this.http.put(`${this.rootUrl}/api/reject?userId=${userId}`, {ApproverId : approverId}, { headers:new HttpHeaders()
    .append('Authorization', `Bearer ${token}`)}).subscribe((res:boolean) => {
          //console.log("res = ", res)
            if(res == true)
              {
                  //console.log("successfull....!!")
                  this.GetAllUser()
              }
            else
              {
                  //console.log("something went wrong....!!")
                  this.GetAllUser()
              }
        })
      }

}
