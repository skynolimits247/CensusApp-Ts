import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../Services/user-service.service';
import{ SingupUser } from '../../../models/signupmodel';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  userList :  SingupUser[];
   visiblity:boolean = true;
  constructor(private service: UserServiceService) { }

 ngOnInit() {
      this.service.$UsersList.subscribe((res: any) => {
          this.userList = res;
          this.visiblity=true;
           for (let user of this.userList ){           
            if(user.CurrentStatus == 1){
                this.visiblity = false;
            }
        }
      })

  }
    ApproveUser(user:SingupUser){
      if(user.CurrentStatus == 1){
        this.service.ApproveUser(user.ID)
      }
    }

    RejectUser(user:SingupUser){
      if(user.CurrentStatus == 1){
        this.service.RejectUser(user.ID)
      }
    }
}
