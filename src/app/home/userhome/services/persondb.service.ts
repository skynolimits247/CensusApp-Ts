import { PersonModel } from './../../../models/personmodel';
import {Injectable, EventEmitter} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { HouseModel } from '../../../models/housemodel';

@Injectable({
  providedIn: 'root'
})
export class PersondbService {
  public db:any
  constructor() {
      this.db = new NgxIndexedDB('censusTbl', 2);
      this.db.openDatabase(2, evt => {
      let objectStore = evt.currentTarget.result.createObjectStore('personentity');
      objectStore.createIndex('FullName', 'FullName', { unique: false });
      objectStore.createIndex('CensusHouseNumber', 'CensusHouseNumber', { unique: false });
      objectStore.createIndex('RelationshipWithOwner', 'RelationshipWithOwner', { unique: false });
      objectStore.createIndex('Gender', 'Gender', { unique: false });
      objectStore.createIndex('DateOfBirth', 'DateOfBirth', { unique: false });
      objectStore.createIndex('MaritalStatus', 'MaritalStatus', { unique: false });
      objectStore.createIndex('AgeAtMarriage', 'AgeAtMarriage', { unique: false });
      objectStore.createIndex('Occupation', 'Occupation', { unique: false });
      objectStore.createIndex('NatureOfWork', 'NatureOfWork', { unique: false });
  });
}

getAllPerson(){
  return this.db.getAll('personentity')
}

addPerson(person : PersonModel){
   this.db.add('personentity', { FullName : person.FullName, CensusHouseNumber : person.CensusHouseNumber,
    RelationshipWithOwner : person.RelationshipWithOwner, Gender : person.Gender,
    DateOfBirth: person.DateOfBirth, MaritalStatus:person.MaritalStatus, AgeAtMarriage:person.MaritalStatus,
    Occupation: person.Occupation, NatureOfWork:person.NatureOfWork}).then(
    () => {
        // Do something after the value was added
        alert("person data added...!!")
        return true
    },
    error => {
        console.log(error);
        return false;
    });
}

deletePersonListing(){
    this.db.clear('personentity').then(
    () => {
        // Do something after clear
       // console.log("db house cleared")
    },
    error => {
        console.log(error);
    }
  );
}

}