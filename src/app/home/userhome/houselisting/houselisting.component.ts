import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseService } from '../../../Services/house.service';
import { Observable, timer } from 'rxjs';
import { HouseModel } from '../../../models/housemodel';
import { Router } from '@angular/router';
import { HousedbService } from '../services/housedb.service';

@Component({
  selector: 'app-houselisting',
  templateUrl: './houselisting.component.html',
  styleUrls: ['./houselisting.component.css']
})
export class HouselistingComponent implements OnInit {
  @Input() onlinemode: boolean;
  censusHouseNumber:string;
  inputhouseform: FormGroup;
  namePattern: any = "[a-zA-Z ]*";
  numberCheck:any = "^[0-9]*$";
  constructor(private fb: FormBuilder, private service: HouseService, private router: Router, private offlineservice : HousedbService) {
    this.createForm()
    
  }

  createForm() {
    this.inputhouseform = this.fb.group({
      BuildingAptNumber:['',Validators.required],
      Line1:['',Validators.required],
      StreetName:['',Validators.required],
      City:['',Validators.compose([ Validators.required, Validators.pattern(this.namePattern)])],
      State:['',Validators.required],
      HeadOfFamily:['',Validators.compose([ Validators.required, Validators.pattern(this.namePattern)])],
      OwnershipStatus:['',Validators.required],
      NumberOfFloor:['',Validators.compose([ Validators.required, Validators.pattern(this.numberCheck)])],
      NumberOfRooms:['',Validators.compose([ Validators.required, Validators.pattern(this.numberCheck)])],
      CensusHouseNumber:[""]
    })
  }
  ngOnInit() {
  }


  onSubmit(houseRegister:HouseModel){
    this.censusHouseNumber=Math.random().toString(10).substr(2);
    this.inputhouseform.value['CensusHouseNumber'] = this.censusHouseNumber;
    if(this.onlinemode){
          this.service.createHouse(houseRegister).subscribe((res:string) => {
          //console.log(res)
            if(res == "forbidden"){
                this.router.navigate(['/forbidden']);
            }
            else if(res !== undefined){

                        alert("Successfully created house listing please make note of your Census House Number "+res+" ")
                        this.censusHouseNumber = res;
              }
            else{
                alert("Oops..! Something went wrong please try again...")
            }

        },
        error => {
          alert("Connectivity not available......Please try offline mode....!")
          return false;
        })
    }
    else{
      //console.log('saving offline') 
      this.offlineservice.addHouse(houseRegister)
      this.censusHouseNumber = this.inputhouseform.value['CensusHouseNumber']
    }
  }

  check(){
    this.censusHouseNumber='';
    this.inputhouseform.reset();
  }

}
