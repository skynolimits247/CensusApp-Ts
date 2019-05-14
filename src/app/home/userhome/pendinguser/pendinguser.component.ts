import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../../../models/usermodel';

@Component({
  selector: 'app-pendinguser',
  templateUrl: './pendinguser.component.html',
  styleUrls: ['./pendinguser.component.css']
})
export class PendinguserComponent implements OnInit {
  user:AuthUser;
  constructor() { }

  ngOnInit() {
              this.user = {
          userfname: localStorage.getItem("userfname"),
          useremail: localStorage.getItem("useremail"),
          userstatus: localStorage.getItem("userstatus"),
          userRoles: localStorage.getItem("userRoles"),
            }
  }

}
