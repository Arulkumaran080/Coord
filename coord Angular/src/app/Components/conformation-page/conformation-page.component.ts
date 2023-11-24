import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { DataService } from 'src/app/Services/data.service';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { EmailService } from 'src/app/Services/email.service';

@Component({
  selector: 'app-conformation-page',
  templateUrl: './conformation-page.component.html',
  styleUrls: ['./conformation-page.component.css'],
})
export class ConformationPageComponent implements OnInit {
  enteredOTP: number = 0;
  user: User | undefined;
  time: boolean = false;

  constructor(
    private data: DataService,
    private loginService: LoginService,
    private route: Router,
    private app: AppComponent,
    private ser: EmailService
  ) {}

  ngOnInit() {
    console.log(this.data.otp)
    this.data.showHead = false;
    this.app.ngOnInit();
    setTimeout(() => {
      this.time = true;
    }, 2000);
  }

  verify() {
    const a = document.querySelector('.btnn');
    if (this.enteredOTP > 99999 && this.enteredOTP < 1000000) {
      a?.classList.add('hov');
    } else {
      a?.classList.remove('hov');
    }
  }

  resend() {
    this.ser.mail(this.data.SignupUser.email).subscribe((res) => {
      this.data.otp = res;
    });
  }

  formSubmit() {
    console.log(this.data.otp)
    console.log(this.enteredOTP)
    if (this.data.otp === this.enteredOTP) {
      alert('Verified Successfully');
      this.user = this.data.SignupUser;
      console.log(this.user)
      this.loginService.signup(this.user).subscribe((data) => {
        this.route.navigate(['/signin']);
      });
    }else{
      alert("OTP is Wrong");
    }
  }
}
