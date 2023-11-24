import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseUrl:string="http://localhost:8082"
  constructor(private http:HttpClient) { }
  
  mail(mail:string){
    return this.http.get<any>(this.baseUrl+"/sendMail/"+mail)
  }
  passwordResetMail(mail:string){
    return this.http.get<any>(this.baseUrl+"/PasswordReset/"+mail)
  }
}
