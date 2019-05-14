import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../Services/user-service.service';
import{ SingupUser } from '../../../models/signupmodel';

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.css']
})
export class AcceptedComponent implements OnInit {
   userList :  SingupUser[];
   visibility:boolean = true;
  constructor(private service: UserServiceService) { }

  ngOnInit() {
      this.service.$UsersList.subscribe((res: any) => {
          this.visibility=true;
          this.userList = res;
           for (let user of this.userList ){
            if(user.CurrentStatus == 2){
                this.visibility = false;
            }
        }
      })
  }

}
