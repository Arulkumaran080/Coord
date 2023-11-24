import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/Services/email.service';
import { DataService } from 'src/app/Services/data.service';
import { LoginService } from 'src/app/Services/login.service';
import { User } from 'src/app/Models/user';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  eye: string = 'fa fa-eye-slash';
  eye_icon: boolean = false;
  pass: string = 'password';
  signUpOtp:number=0
  signup = {
    email: '',
    password: '',
  };
  exists:any
  time: boolean = false;

  constructor(
    private router: Router,
    private ser: EmailService,
    private data: DataService,
    private loginService:LoginService,
    private app: AppComponent
  ) {}

  ngOnInit() {
    this.data.showHead=false
    this.app.ngOnInit();
    setTimeout(() => {
      this.time = true;
    }, 2000);
  }

  show() {
    if (!this.eye_icon) {
      this.eye = 'fa fa-eye';
      this.pass = 'text';
      this.eye_icon = !this.eye_icon;
    } else {
      this.eye = 'fa fa-eye-slash';
      this.pass = 'password';
      this.eye_icon = !this.eye_icon;
    }
  }

  mail() {
    this.loginService.login().subscribe(data=>{
      this.exists=data.find((a:any)=>{
        return (a.email===this.signup.email);
      })
      if(this.exists){
        alert("mail already exist")
      }
      else{
        this.ser.mail(this.signup.email).subscribe((res) => {
          this.data.otp=res
        });
        this.data.SignupUser=this.signup
        this.router.navigate(['/conformationPage'])
      }
    })
  }
}
