import { register } from 'ts-node/dist';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../validation/password-validate';
import { UserServiceService } from '../../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  angForm: FormGroup;
  unique: string='';
  passPattern:any = "^((?=.*?[A-Za-z0-9])(?=.*?[#?!@$%^&*-])).{5,}$";
  numberCheck:any = "^[0-9]*$";
  selectedFile:File;
  imgsrc: string;
  ref:AngularFireStorageReference;
  task:AngularFireUploadTask;
  error:boolean=false;
  downloadURL : Observable<string>;
  uploadState  : Observable<string>;
  percentage: Observable<number>;
  snapshot: Observable<any>;

  constructor(private afStorage: AngularFireStorage, 
                  private fb: FormBuilder, private service: UserServiceService,
                    private router: Router) {
    this.createForm()
   }

   createForm() {
    this.angForm = this.fb.group({
      FirstMidName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)]) ],
          LastName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)]) ],
          Password:['',Validators.compose([ Validators.required, Validators.pattern(this.passPattern)]) ],
   ConfirmPassword:['', PasswordValidation],
      AdhaarNumber: ['',Validators.compose([ Validators.required, Validators.pattern(this.numberCheck) ,
                              Validators.minLength(12), Validators.maxLength(12), Validators.maxLength(50)]), this.service.aadharValidator()],
             Email: ['',Validators.compose([Validators.required, Validators.email]), this.service.emailValidator()],
      ProfileImage: ['', [Validators.required]],
          });
  }

  ngOnInit() {
  }

  onFileChange(event){
      if (event.target.files[0].type === 'image/jpeg' || 
           event.target.files[0].type === 'image/png' || 
            event.target.files[0].type ==='image/jpg') {
            if (event.target.files[0].size < 5000000) {
                  let file = event.target.files[0];
                   this.unique = Math.random().toString(36).substring(2);
                   //console.log("unique",this.unique)
                  this.ref = this.afStorage.ref(this.unique);
                  //this.task = this.ref.put(event.target.files[0])
                  this.task = this.afStorage.upload(this.unique, event.target.files[0])
                      this.percentage = this.task.percentageChanges();
                      this.snapshot   = this.task.snapshotChanges()
                      this.unique = `https://firebasestorage.googleapis.com/v0/b/demoproject-1287a.appspot.com/o/${this.unique}?alt=media&token=93bb3ebe-5d6c-45fe-9fab-4c9c70b3efc7`               
                }
                else{
                  this.angForm.controls['ProfileImage'].setErrors({'fileSizeError': true});
                }
            }
          else{
              this.angForm.controls['ProfileImage'].setErrors({'fileTypeError': true});
            }
  }

  onSubmit(registerForm:FormGroup){ 
     this.angForm.value['ProfileImage'] = this.unique;
     //console.log(registerForm.value);
     this.service.createUser(registerForm.value).subscribe((res:boolean) => {
      if(res == true){
           this.router.navigate(['/login']);
      }
      else{
        this.error=true
      }
    })
  }
  Reset(){
    this.angForm.reset();
  }
} 
