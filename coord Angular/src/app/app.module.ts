import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { HomeComponent } from './Components/home/home.component';
import { PinComponent } from './Components/pin/pin.component';
import { StarredComponent } from './Components/starred/starred.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ConformationPageComponent } from './Components/conformation-page/conformation-page.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { PasswordResetComponent } from './Components/password-reset/password-reset.component';
import { ModalComponent } from './Components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { EditModalComponent } from './Components/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './Components/delete-modal/delete-modal.component';
import { TagsComponent } from './Components/tags/tags.component';
import { MatIconModule } from '@angular/material/icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BoardComponent } from './Components/board/board.component';
import { BoardModelComponent } from './Components/board-model/board-model.component';
import { AddBoardModelComponent } from './Components/add-board-model/add-board-model.component';
import { HomePageComponent } from './new-component/home-page/home-page.component';
import { NavBarComponent } from './new-component/nav-bar/nav-bar.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './new-component/store/reducers';
import { CoordCardComponent } from './new-component/coord-card/coord-card.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './new-component/auth-store/auth.effects';
import { ToastrModule } from 'ngx-toastr';
import * as fromAuth from './new-component/auth-store/auth.reducer';
import * as fromItemStore from './new-component/store/reducer/items.reducer';
import { ItemEffects } from './new-component/store/item.effects';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    PinComponent,
    StarredComponent,
    DashboardComponent,
    ConformationPageComponent,
    LoadingComponent,
    PasswordResetComponent,
    ModalComponent,
    EditModalComponent,
    DeleteModalComponent,
    TagsComponent,
    BoardComponent,
    BoardModelComponent,
    AddBoardModelComponent,
    HomePageComponent,
    NavBarComponent,
    CoordCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    NgbModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    SlickCarouselModule,
    MatAutocompleteModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature(fromItemStore.itemsFeatureKey, fromItemStore.itemsReducer),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    EffectsModule.forRoot([AuthEffects]),
    EffectsModule.forFeature([ItemEffects]),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
