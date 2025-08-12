import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardModelComponent } from 'src/app/Components/add-board-model/add-board-model.component';
import { ModalComponent } from 'src/app/Components/modal/modal.component';
import { passValueService } from 'src/app/Services/passValue.service';

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

  constructor(private dialogRef: MatDialog, private value: passValueService) {}

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
