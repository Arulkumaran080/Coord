import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddBoardModelComponent } from 'src/app/Components/add-board-model/add-board-model.component';
import { ModalComponent } from 'src/app/Components/modal/modal.component';
import { passValueService } from 'src/app/Services/passValue.service';
import { selectAuthState, selectUser } from '../auth-store/auth.reducer';
import { GetItemsBasedOnTabName } from '../store/action/items.actions';

export interface TabName {
  name: string;
  isClicked: boolean;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  @Output() tabName = new EventEmitter<TabName>();

  constructor(
    private dialogRef: MatDialog,
    private value: passValueService,
    private store: Store
  ) { }

  openDialog() {
    this.dialogRef.open(ModalComponent);
  }
  openDialogBoard(id: number) {
    this.dialogRef.open(AddBoardModelComponent);
    this.value.itemId = id;
  }

  outputTabName(name: string) {
    this.tabName.emit({
      name,
      isClicked: true,
    });

    let userDetails!: { id: number, tabName: string };
    this.store.select(selectUser).pipe().subscribe((state) => {
      userDetails = state;
    });

    if (name && userDetails) {
      this.store.dispatch(new GetItemsBasedOnTabName({ tabName: name.toLowerCase(), userId: userDetails.id }));
    }

    const a = document.querySelector('.active');
    if (a) {
      a.classList.remove('active');
    }
    document.querySelector('.' + name.toLowerCase())?.classList.add('active');
  }

  active(name: string) {
    const a = document.querySelector('.active');
    if (a) {
      a.classList.remove('active');
    }
    document.querySelector('.' + name)?.classList.add('active');
  }
}
