import { PersonModel } from './../models/personmodel';
import { PersondbService } from './../home/userhome/services/persondb.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';
import { HouseModel } from '../models/housemodel';
import { HousedbService } from '../home/userhome/services/housedb.service';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
 readonly rootUrl = 'http://localhost:60206';
  onlineflag:boolean;
  constructor(private http: HttpClient, private offlineservice : HousedbService, private personOfflineService: PersondbService) { 
  }

    createHouse(housetoCreate: HouseModel){
      //console.log("service calling...!")
      var token:string = localStorage.getItem('userToken')
      var approverId: string = localStorage.getItem('userid')
      return this.http.post(`${this.rootUrl}/api/home?approverId=${approverId}`, housetoCreate, { headers:new HttpHeaders().append('Authorization', `Bearer ${token}`)});
      }
      createBulkHouse(housetoCreate: HouseModel[]){
      //console.log("create bulk house service calling...!")
      var token:string = localStorage.getItem('userToken')
      var approverId: string = localStorage.getItem('userid')
      return this.http.post(`${this.rootUrl}/api/home/sync?approverId=${approverId}`, housetoCreate, { headers:new HttpHeaders().append('Authorization', `Bearer ${token}`)});
      }

  CHNValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.SearchCHN(control.value)
        .pipe(
          map((res:boolean) => {
            //console.log(res);
            if (res == false || res == undefined) {
              // return error
              return { 'CHNNotExists': true};
            }
          })
        );
    };
  }

  SearchCHN(text:string) {
   // console.log("seacrh = ",text)
    return timer()
      .pipe(
        switchMap(() => {
          var token:string = localStorage.getItem('userToken')
          var approverId: string = localStorage.getItem('userid')
          if(localStorage.getItem('onlinemode')=='true'){
          return this.http.get<boolean>(`${this.rootUrl}/api/home/chncheck?chn=${text}&approverId=${approverId}`, { headers:new HttpHeaders().append('Authorization', `Bearer ${token}`)})
          }
          else{
            return this.offlineservice.searchHouseByCHN(text)
            }
        })
      );
  }

  CreatePerson(personToCreate:PersonModel){
      var token:string = localStorage.getItem('userToken')
      var approverId: string = localStorage.getItem('userid')
      return this.http.post(`${this.rootUrl}/api/person?approverId=${approverId}`, personToCreate, { headers:new HttpHeaders().append('Authorization', `Bearer ${token}`)})
  }

    CreateBulkPerson(personToCreate:PersonModel[]){
      var token:string = localStorage.getItem('userToken')
      var approverId: string = localStorage.getItem('userid')
      return this.http.post(`${this.rootUrl}/api/person/sync?approverId=${approverId}`, personToCreate, { headers:new HttpHeaders().append('Authorization', `Bearer ${token}`)})
  }
  checkconnectivity(){
    return this.http.get(`${this.rootUrl}/api/home/check`)
  }

  syncingHousedata(){
    let houseSyncFlag: boolean = true;
    //console.log("syncing houses data :")
    return this.offlineservice.getAllHouses().then((house) => {
                      console.log("from offline hosuedb all houses")
                      console.log(house)
                          this.createBulkHouse(house).subscribe((res: any) => { 
                            console.log("response receiveed from bulk house ")
                            console.log(res)
                              if(res == true){
                                  alert("House data successfully synced....")
                              }
                              else if(res == "forbidden"){ 
                                  alert("You're not authorized to add houses....")
                              }else{  
                                 for(let i of res){
                                    alert("Unable to update House entry for : "+i.BuildingAptNumber+" Head of Family : "+i.HeadOfFamily+"...please recollect or re-add their data...!")
                                }
                              }
                            //console.log("now syncing person data...")
                            this.offlineservice.deleteHouseListing() 
                            //console.log("house data deleted")       
                            this.offlineservice.getAllHouses() 
                            this.syncingPersondata()
                            return true;
                          },
                  error => {
                    alert("error occured while saving house entity offline....Please Re-login and try again...!")
                    return false;
                  })     
                  },
                  error => {
                    console.log("error occured while saving house entity offline")
                    return false;
                  })
  }

    syncingPersondata(){
    let personSyncFlag: boolean = true;
    //console.log("syncing person data")
    return this.personOfflineService.getAllPerson().then((person) => {
                      //console.log("from offline persondb all persons")
                      //console.log(person)
                          this.CreateBulkPerson(person).subscribe((res:any) => { 
                            //console.log("res received from bulk person")
                            //console.log(res)
                              if(res == true){
                                  alert("Person data successfully synced....")
                              }
                              else if(res == "forbidden"){ 
                                  alert("You're not authorized to add persons....")
                              }else{  
                                 for(let i of res){
                                  alert("Unable to update Person entry for : "+i.FullName+" Date of Birth : "+i.DateOfBirth+"...please recollect or re-add their data...!")
                                }
                              }
                              this.personOfflineService.deletePersonListing()
                              this.personOfflineService.getAllPerson() 
                              localStorage.setItem('onlinemode','true')
                              return true; 
                          },
                           error => {
                              alert("Session timed out with server....Please Re-login and try again...!")
                              localStorage.setItem('onlinemode','false')
                              return false;
                            })  
                  },
                  error => {
                    console.log("error occured while uploading person entity offline")
                    localStorage.setItem('onlinemode','false')
                    return false;
                  })
  }
        
    syncingdata(){
      return this.syncingHousedata()
    }

    GetAllPersons(){
      var token:string = localStorage.getItem('userToken')
      var approverId: string = localStorage.getItem('userid')
      return this.http.get(`${this.rootUrl}/api/person/all`, { headers:new HttpHeaders().append('Authorization', `Bearer ${token}`)})
  }


}