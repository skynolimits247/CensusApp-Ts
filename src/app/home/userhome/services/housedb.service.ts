import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { HouseModel } from '../../../models/housemodel';
import { indexDebugNode } from '@angular/core/src/debug/debug_node';

@Injectable({
  providedIn: 'root'
})
export class HousedbService {
  public db:any
  constructor() {
      this.db = new NgxIndexedDB('myDbtest', 2);
      this.db.openDatabase(2, evt => {
      let objectStore = evt.currentTarget.result.createObjectStore('houseentity');
      objectStore.createIndex('BuildingAptNumber', 'BuildingAptNumber', { unique: false });
      objectStore.createIndex('CensusHouseNumber', 'CensusHouseNumber', { unique: true });
      objectStore.createIndex('Line1', 'Line1', { unique: false });
      objectStore.createIndex('StreetName', 'StreetName', { unique: false });
      objectStore.createIndex('City', 'City', { unique: false });
      objectStore.createIndex('State', 'State', { unique: false });
      objectStore.createIndex('HeadOfFamily', 'HeadOfFamily', { unique: false });
      objectStore.createIndex('OwnershipStatus', 'OwnershipStatus', { unique: false });
      objectStore.createIndex('NumberOfFloor', 'NumberOfFloor', { unique: false });
      objectStore.createIndex('NumberOfRooms', 'NumberOfRooms', { unique: false });
  });
}


getAllHouses(){
    return this.db.getAll('houseentity')
}

searchHouseByCHN(chn){
  return this.db.getByIndex('houseentity', 'CensusHouseNumber', chn)
}

addHouse(house : HouseModel){
    //console.log("saving hosue")
    //console.log(house)
     this.db.add('houseentity', { BuildingAptNumber: house.BuildingAptNumber, CensusHouseNumber: house.CensusHouseNumber,
                        Line1 : house.Line1, StreetName : house.StreetName, City : house.City, State : house.State,
                           HeadOfFamily : house.HeadOfFamily, OwnershipStatus : house.OwnershipStatus,
                         NumberOfFloor : house.NumberOfFloor, NumberOfRooms: house.NumberOfRooms
                    })
                        .then(
    () => {
        alert("house data added...!!")
    },
    error => {
        //console.log("error occured")
        console.log(error);
    }
);
}

deleteHouseListing(){
  this.db.clear('houseentity').then(
    () => {
       // console.log("db house cleared")
    },
    error => {
        //console.log(error);
    }
  );
}

}