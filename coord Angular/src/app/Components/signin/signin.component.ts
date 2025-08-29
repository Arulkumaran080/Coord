import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/Services/login.service';
import { AppComponent } from 'src/app/app.component';
import { DataService } from 'src/app/Services/data.service';
import { CurrentUser } from 'src/app/Models/user';
import { passValueService } from 'src/app/Services/passValue.service';
import { Item } from 'src/app/Models/Item';
import { Store } from '@ngrx/store';
import { UpdateUserDetails } from 'src/app/new-component/store/action/items.actions';
import { CurrentUsers } from 'src/app/Models/CurrentUser';
import { Login } from 'src/app/new-component/auth-store/auth-store.actions';
import { Observable } from 'rxjs';
import { selectError } from 'src/app/new-component/auth-store/auth.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  eye: string = 'fa fa-eye-slash';
  eye_icon: boolean = false;
  pass: string = 'password';
  loginData = {
    email: '',
    password: '',
  };
  user: CurrentUsers | undefined;
  wrong: boolean = false;
  time: boolean = false;
  currentUser!: CurrentUsers;
  dummyUser: CurrentUser = {
    id: 1,
    name: 'Arul',
    email: 'arul@gmail.com',
    mobile: '7397177956',
    imageUrl: 'assets\Images\Home\profile.jpg'
  };
  errorMessage$: Observable<string> = this.store.select(selectError).pipe(
    filter((err): err is string => err !== null)
  );

  constructor(
    private router: Router,
    private bar: MatSnackBar,
    private loginService: LoginService,
    private app: AppComponent,
    private data: DataService,
    private value: passValueService,
    private store: Store
  ) { }

  ngOnInit() {
    // sessionStorage.setItem("showhead","false");
    this.data.showHead = false;
    this.app.ngOnInit();
    setTimeout(() => {
      this.time = true;
    }, 0);
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

  userAuthentication() {
    this.store.dispatch(new Login(this.loginData.email, this.loginData.password));
  }

  login() {
    this.app.ngOnInit();
    this.loginService.login().subscribe((data) => {
      this.user = data.find((a: any) => {
        return (
          a.email === this.loginData.email &&
          a.password === this.loginData.password
        );
      });
      if (this.user) {
        sessionStorage.setItem("email", this.user.email);
        sessionStorage.setItem("id", this.user.id.toString());
        this.currentUser = this.user
        this.value.user = this.currentUser;
        this.value.starItem = this.user.items.filter((p) => p.star === true)
        this.value.pinItem = this.user.items.filter((p) => p.pin === "pin")
        this.router.navigate(['/home']);
      } else {
        console.log('Not');
        this.wrong = true;
      }
    });

  }

}
