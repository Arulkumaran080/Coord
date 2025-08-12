import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { HomeComponent } from './Components/home/home.component';
import { StarredComponent } from './Components/starred/starred.component';
import { PinComponent } from './Components/pin/pin.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ConformationPageComponent } from './Components/conformation-page/conformation-page.component';
import { PasswordResetComponent } from './Components/password-reset/password-reset.component';
import { ModalComponent } from './Components/modal/modal.component';
import { TagsComponent } from './Components/tags/tags.component';
import { BoardComponent } from './Components/board/board.component';
import { BoardModelComponent } from './Components/board-model/board-model.component';
import { AddBoardModelComponent } from './Components/add-board-model/add-board-model.component';
import { HomePageComponent } from './new-component/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'star', component: StarredComponent },
  { path: 'pin', component: PinComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'conformationPage', component: ConformationPageComponent },
  { path: 'passwordReset', component: PasswordResetComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'board', component: BoardComponent },
  { path: 'board-modal', component: BoardModelComponent },
  { path: 'AddBoardModelComponent', component: AddBoardModelComponent },

  { path: 'home-page', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
