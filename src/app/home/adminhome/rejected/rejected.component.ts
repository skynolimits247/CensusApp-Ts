import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../Services/user-service.service';
import{ SingupUser } from '../../../models/signupmodel';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {
   userList :SingupUser[];
   visiblity:boolean = true;
  constructor(private service: UserServiceService) { }

  ngOnInit() {
      this.service.$UsersList.subscribe((res: any) => {
          this.userList = res;
          for (let user of this.userList ){
            if(user.CurrentStatus == 3){
                this.visiblity = false;
            }
        }
      })

  }

}
