import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { DataService } from 'src/app/Services/data.service';
import { LoginService } from 'src/app/Services/login.service';
import { EmailService } from 'src/app/Services/email.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit{

  show:boolean=true
  enteredOTP:number =0
  user:any 

  email:string=''  
  originalOTP:number=0
  newPassword:string=''
  cnfrmPassword:string=''
  time: boolean = false;

  constructor(private data:DataService,private loginService:LoginService,private route:Router,private emailService:EmailService,private app: AppComponent){}

  ngOnInit() {
    this.data.showHead=false
    this.app.ngOnInit();
    setTimeout(() => {
      this.time = true;
    }, 2000);
  }

  verify(){
    const a=document.querySelector('.sub')
    if(this.enteredOTP>99999 && this.enteredOTP<1000000 ){
      a?.classList.add('hov');
    }
    else{
      a?.classList.remove('hov')
    }

    const b=document.querySelector('.otp')
    if(this.email ){
      b?.classList.add('hov');
    }
    else{
      b?.classList.remove('hov')
    }
  }

  formSubmit(){
    if(this.enteredOTP===this.data.resetOTP){
      if(this.newPassword===this.cnfrmPassword){
        this.data.passwordResetUser.password=this.newPassword
        this.loginService.updatePassword(this.data.passwordResetUser).subscribe(res=>{
          alert("updated")
        })
      }
    }
  }

  resendOTP(){
    this.emailService.passwordResetMail(this.email).subscribe(res=>{
      this.data.resetOTP=res;
    })
  }

  Email(){
    this.data.passwordResetUser.email=this.email
    this.loginService.login().subscribe(data=>{
      this.user=data.find((a:any)=>{
        return(a.email===this.email);
      });
      if(this.user){
        this.show=false
        this.emailService.passwordResetMail(this.email).subscribe(res=>{
          this.data.resetOTP=res;
        })
      }
      else{
        alert("Email Does'nt Exist, Please Try to Signup")
      }
    })
  }
}

