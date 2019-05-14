import { PersonModel } from './../../../models/personmodel';
import { Component, OnInit } from '@angular/core';
import { HouseService } from './../../../Services/house.service';
import * as moment from 'moment';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public pieChartLabels:string[] = ['Infants', 'Teens', 'Youths', 'Olds'];
  infants:number = 0;
  teens:number = 0;
  youth:number = 0;
  olds:number = 0;
  public pieChartData:number[] = [21, 39, 10, 10];
  public pieChartType:string = 'pie';
  public pieChartOptions:any = {'backgroundColor': [
               "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
            ]}
  constructor(private service: HouseService) { }

  ngOnInit() {
    this.service.GetAllPersons().subscribe((res : PersonModel) => {  
        if(res != null || res !== undefined){
          for(let person of res){ 
            if(this.ageFromDateOfBirth(person.DateOfBirth) < 10){ 
              this.infants +=1;
            }
            else if(this.ageFromDateOfBirth(person.DateOfBirth) < 20){ 
                this.teens +=1;
            }
            else if(this.ageFromDateOfBirth(person.DateOfBirth) < 40){ 
              this.youth +=1;
            }
            else if(this.ageFromDateOfBirth(person.DateOfBirth)>=40){ 
              this.olds +=1;
            }
          }
          this.pieChartData[0] = this.infants;
          this.pieChartData[1] = this.teens;
          this.pieChartData[2] = this.youth;
          this.pieChartData[3] = this.olds;
        }
    })

  }
  public chartClicked(e:any):void {
    //console.log(e);
  }
  ageFromDateOfBirth(dob:any){
  return moment().diff(dob, 'years');
 }


 // event on pie chart slice hover
  public chartHovered(e:any):void {
    //console.log(e);
  }
}
