import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { HouseService } from '../../../Services/house.service';
import{ PersonModel } from '../../../models/personmodel';
import { PersondbService } from '../services/persondb.service';
import { DateValidation } from '../../../validation/date-validate';

@Component({
  selector: 'app-censusregister',
  templateUrl: './censusregister.component.html',
  styleUrls: ['./censusregister.component.css']
})
export class CensusregisterComponent implements OnInit {
  personForm : FormGroup;
  @Input() onlinemode: boolean;
  namePattern: any = "[a-zA-Z ]*";
  numberCheck:any = "^[0-9]*$";
  constructor(private fb: FormBuilder, private service: HouseService, private router: Router, private offlineservice : PersondbService ) { 
    this.createForm()
    
  }

  createForm(){
      this.personForm = this.fb.group({
      FullName:["", Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
      CensusHouseNumber: ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(19), 
                                  Validators.pattern(this.numberCheck)]), this.service.CHNValidator()],
                                  //, DateValidation
      RelationshipWithOwner:["", [Validators.required]],
      Gender:["", [Validators.required]],      
      DateOfBirth: ["",  Validators.compose([Validators.required, DateValidation])],
      MaritalStatus: ["", [Validators.required]],
      AgeAtMarriage: ["0",Validators.pattern(this.numberCheck)],
      Occupation: ["",],
      NatureOfWork: ["",],
  });

  }


  ngOnInit() {
  }

  check(){
    this.personForm.reset();
  }

  onSubmit(personToAdd:PersonModel){
      //console.log(personToAdd)
      if(this.onlinemode){
          this.service.CreatePerson(personToAdd).subscribe((res:any) => {
          //console.log('res')
          //console.log(res)
            if(res == true)
              {
                alert("Data successfully saved...!")
                this.check()
              }
              else if(res == 'forbidden')
              {
                  this.router.navigate(['/forbidden']);
              }
              else{
                alert("Data provided is not correct...!")
              }
        },
        error => {
          alert("Connectivity not available......Please try offline mode....!")
          return false;
        })
      }
      else{
      //console.log("offline mode...")
      this.offlineservice.addPerson(personToAdd)
        this.check()
    }
  }
}
