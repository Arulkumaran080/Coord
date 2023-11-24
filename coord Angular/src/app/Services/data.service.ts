import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  showHead:boolean=false
  otp:number=0;
  resetOTP:number=0

  constructor() { }

  currentUser={
    email:'',
    password:''
  }

  SignupUser={
    email:'',
    password:''
  }
  passwordResetUser={
    email:'',
    password:''
  }
}
