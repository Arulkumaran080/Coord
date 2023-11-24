import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/Models/CurrentUser';
import { Item } from 'src/app/Models/Item';
import { ItemService } from 'src/app/Services/item.service';
import { LoginService } from 'src/app/Services/login.service';
import { passValueService } from 'src/app/Services/passValue.service';
import { ModalComponent } from '../modal/modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.component.html',
  styleUrls: ['./starred.component.css'],
})
export class StarredComponent {
  constructor(
    private dialogRef: MatDialog,
    private router: Router,
    private value: passValueService,
    private loginService: LoginService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.getByMail();
  }

  list: number = 0;
  item: Item[]=[];
  i: any;
  user!: CurrentUser;
  star: string = 'fa-regular fa-star';
  starBoolen: boolean = false;
  modifiedDate: boolean = false;

  // refresh() {
  //   this.loginService.login().subscribe((data) => {
  //     this.user = data.find((a: any) => {
  //       return a.email === this.value.user.email;
  //     });
  //     if (this.user) {
  //       this.value.user = this.user;
  //     }
  //   });
  //   this.item = this.value.user.items;
  //   this.list = this.value.user.items.length;
  // }

  getByMail() {
    const a = sessionStorage.getItem('email');
    if (a !== null) {
      this.loginService.getByMail(a).subscribe((res) => {
        this.value.user = res;
        this.value.starItem = res.items.filter((p) => p.star === true);
        this.item = this.value.starItem;
        this.list = this.value.starItem.length;
      });
    }
  }

  openDialog() {
    this.dialogRef.open(ModalComponent);
  }

  likeStar(id: number, b: boolean, item1: Item) {
    item1.star = !b;
    this.itemService.updateItem(id, item1).subscribe((res) => {});
  }

  edit(eitem: Item) {
    this.value.editItem = eitem;
    this.dialogRef.open(EditModalComponent);
  }
  deleteItem(i: number) {
    this.value.deleteItem = i;
    this.dialogRef.open(DeleteModalComponent);
  }
  active(name: string) {
    const a = document.querySelector('.active');
    if (a) {
      a.classList.remove('active');
    }
    document.querySelector('.' + name)?.classList.add('active');
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

  UpdationDate() {
    const updationDate = this.item.slice().sort((a, b) => {
      const dateA = new Date(a.updationTime);
      const dateB = new Date(b.updationTime);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
    this.item = updationDate
    this.modifiedDate = true;
  }

  ReverseUpdationTime() {
    const updationDate = this.item.slice().sort((a, b) => {
      const dateA = new Date(a.updationTime);
      const dateB = new Date(b.updationTime);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
    updationDate.reverse();
    this.item = updationDate;
    this.modifiedDate = true;
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
