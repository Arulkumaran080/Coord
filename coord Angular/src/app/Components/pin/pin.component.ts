import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/Services/item.service';
import { LoginService } from 'src/app/Services/login.service';
import { passValueService } from 'src/app/Services/passValue.service';
import { ModalComponent } from '../modal/modal.component';
import { CurrentUsers } from 'src/app/Models/CurrentUser';
import { Item } from 'src/app/Models/Item';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css'],
})
export class PinComponent {
  list: number = 0;
  item!: Item[];
  i: any;
  user!: CurrentUsers;
  star: string = 'fa-regular fa-star';
  starBoolen: boolean = false;
  modifiedDate: boolean = false;

  constructor(
    private dialogRef: MatDialog,
    private router: Router,
    private value: passValueService,
    private loginService: LoginService,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    const a = sessionStorage.getItem('email');
    if (a !== null) {
      this.getByMail(a);
    }
    // this.item = this.value.pinItem;
    // if (this.value.pinItem) {
    //   this.list = 1;
    // }
  }

  getByMail(val: string) {
    this.loginService.getByMail(val).subscribe((res) => {
      this.value.user = res;
      this.value.pinItem = res.items.filter((p) => p.pin === 'pin');
      this.item = this.value.pinItem;
      this.list = this.value.pinItem.length;
    });
  }
  openDialog() {
    this.dialogRef.open(ModalComponent);
  }
  active(name: string) {
    const a = document.querySelector('.active');
    if (a) {
      a.classList.remove('active');
    }
    document.querySelector('.' + name)?.classList.add('active');
  }
  likeStar(id: number, b: boolean, item1: Item) {
    item1.star = !b;
    this.itemService.updateItem(id, item1).subscribe((res) => { });
  }
  edit(eitem: Item) {
    this.value.editItem = eitem;
    this.dialogRef.open(EditModalComponent);
  }
  deleteItem(i: number) {
    this.value.deleteItem = i;
    this.dialogRef.open(DeleteModalComponent);
  }

  arrangeInAlphabet() {
    const arrangeAlphabet = this.item.slice().sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    this.item = arrangeAlphabet
    this.modifiedDate = false;
  }

  ReverseInAlphabet() {
    const ReverseAlphabet = this.item.slice().sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
    this.item = ReverseAlphabet
    this.modifiedDate = false;
  }

  CreationDate() {
    const creationDate = this.item.slice().sort((a, b) => {
      const dateA = new Date(a.insertionTime);
      const dateB = new Date(b.insertionTime);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
    this.item = creationDate
    this.modifiedDate = false;
  }

  ReverseCreationDate() {
    const creationDate = this.item.slice().sort((a, b) => {
      const dateA = new Date(a.insertionTime);
      const dateB = new Date(b.insertionTime);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
    creationDate.reverse();
    this.item = creationDate
    this.modifiedDate = false;
  }


  convetDateToShortTerm(InsertionDate: any, updationDate: any): string {
    let dateObj = new Date(InsertionDate);
    if (this.modifiedDate) {
      dateObj = new Date(updationDate);
    }
    const formattedDate = dateObj.getDate();
    const formattedMonth = dateObj.toLocaleString('en-us', { month: 'short' });
    const formattedString = `${formattedMonth}-${formattedDate}`;
    return formattedString;
  }
}
