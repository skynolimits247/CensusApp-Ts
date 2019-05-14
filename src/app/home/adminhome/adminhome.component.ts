import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../../models/usermodel';
import { UserServiceService } from '../../Services/user-service.service';
import{ SingupUser } from '../../models/signupmodel';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  user:AuthUser;
  approved:number=0;
  pending:number=0;
  rejected:number=0;
  userList :SingupUser[];
  constructor(private service: UserServiceService) { 

  }

  ngOnInit() {
    this.user = {
          userfname: localStorage.getItem("userfname"),
          useremail: localStorage.getItem("useremail"),
          userstatus: localStorage.getItem("userstatus"),
          userRoles: localStorage.getItem("userRoles")
    }
         this.service.GetAllUser();
          this.service.$UsersList.subscribe((res: any) => {
                this.approved =0;
                this.pending =0;
                this.rejected =0;
          this.userList = res;
          for (let user of this.userList ){
            if(user.CurrentStatus == 1){
                this.pending += 1;
            } 
            if(user.CurrentStatus == 2){
                this.approved += 1;
            }
            if(user.CurrentStatus == 3){
                this.rejected += 1;
            }
        }
      })
  }

}
