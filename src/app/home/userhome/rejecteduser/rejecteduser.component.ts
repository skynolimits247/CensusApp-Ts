import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../../../models/usermodel';

@Component({
  selector: 'app-rejecteduser',
  templateUrl: './rejecteduser.component.html',
  styleUrls: ['./rejecteduser.component.css']
})
export class RejecteduserComponent implements OnInit {
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
