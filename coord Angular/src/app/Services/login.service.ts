import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../Models/user';
import { CurrentUser } from '../Models/CurrentUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl:string="http://localhost:8082"
  constructor(private http:HttpClient) { }

  login(){
    return this.http.get<any>(this.baseUrl+"/user");
  }

  signup(data:User){
    return this.http.post<User>(this.baseUrl+"/user",data);
  }

  updatePassword(data:User){
    return this.http.put<User>(this.baseUrl+"/passwordUpdate/"+data.email,data)
  }

  getById(id:number){
    console.log(this.http.get<any>(this.baseUrl+"/user/"+id))
    return this.http.get<any>(this.baseUrl+"/user/"+id);
  }

  getByMail(mail:string){
    return this.http.get<CurrentUser>(this.baseUrl+"/userMail/"+mail);
  }
}
