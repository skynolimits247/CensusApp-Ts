import { HouseService } from '../../Services/house.service';
import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../../models/usermodel';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  user:AuthUser;
  onlinemode:boolean;
  constructor(private service : HouseService) { }

  ngOnInit() {
        this.service.checkconnectivity().subscribe((res:boolean) => {
      if(res){
        //console.log("going online")
            this.service.syncingdata()
            this.onlinemode=true;
            localStorage.setItem('onlinemode','true')
      }
      else{
        alert("sorry connectivity not available try after some time..!!")
        localStorage.setItem('onlinemode','false')
        this.onlinemode=false;
      }
    },
    error => {
        alert("sorry server not available try after some time..!!")
        localStorage.setItem('onlinemode','false')
        this.onlinemode=false;
    })
      if((localStorage.getItem('onlinemode')) == 'true'){
        this.onlinemode = true
      }
      else{
        this.onlinemode = false
      }
          this.user = {
          userfname: localStorage.getItem("userfname"),
          useremail: localStorage.getItem("useremail"),
          userstatus: localStorage.getItem("userstatus"),
          userRoles: localStorage.getItem("userRoles"),
    }
  }
  goingOffline(){
    //console.log("going offline",this.onlinemode)
    this.onlinemode=false;
    localStorage.setItem('onlinemode','false')
  }

  goingOnline(){
   // console.log("syncing...",this.onlinemode)
    this.service.checkconnectivity().subscribe((res:boolean) => {
      if(res){
       // console.log("going online")
            this.service.syncingdata()
            this.onlinemode=true;
            localStorage.setItem('onlinemode','true')
      }
      else{
        alert("sorry connectivity not available try after some time..!!")
      }
    },
    error => {
        alert("sorry server not available try after some time..!!")
    })
  }



}
