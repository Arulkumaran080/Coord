import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from 'src/app/Components/modal/modal.component';
import { Router } from '@angular/router';
import { passValueService } from 'src/app/Services/passValue.service';
import { Item } from 'src/app/Models/Item';
import { LoginService } from 'src/app/Services/login.service';
import { CurrentUser } from 'src/app/Models/CurrentUser';
import { ItemService } from 'src/app/Services/item.service';
import { EditModalComponent } from 'src/app/Components/edit-modal/edit-modal.component';
import { DeleteModalComponent } from 'src/app/Components/delete-modal/delete-modal.component';
import { AddBoardModelComponent } from 'src/app/Components/add-board-model/add-board-model.component';
import { TabName } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(
    private dialogRef: MatDialog,
    private router: Router,
    private value: passValueService,
    private loginService: LoginService,
    private itemService: ItemService
  ) {}

  list: number = 0;
  item: Item[] = [];
  user!: CurrentUser;
  star: string = 'fa-regular fa-star';
  starBoolen: boolean = false;
  tagList: string[] = [];
  abc: any;
  modifiedDate: boolean = false;
  mail!: string;
  id: number = 0;

  tabHeaderName: string = 'Home';

  ngOnInit() {
    const a = sessionStorage.getItem('email');
    const b = sessionStorage.getItem('id');
    if (b) {
      this.id = parseInt(b);
    }
    if (a !== null) {
      this.getByMail(a);
      this.mail = a;
    }
  }

  handleTabChange(event: TabName) {
    if (event.isClicked) {
      this.tabHeaderName = event?.name;
    }
  }

  getByMail(val: string) {
    this.loginService.getByMail(val).subscribe((res) => {
      console.log(res);
      this.value.user = res;
      this.item = res.items;
      this.list = res.items.length;
      this.value.starItem = res.items.filter((p) => p.star === true);
      this.value.pinItem = res.items.filter((p) => p.pin === 'pin');
      const pin = res.items.filter((p) => p.pin === 'pin');
      const Unpin = res.items.filter((p) => p.pin !== 'pin');
      this.item = [...pin, ...Unpin];
      this.item.filter((p: any) => {
        this.tagList = [...this.tagList, ...p.tags];
      });
      this.value.tagList = this.tagList.filter(
        (value, index, self) => self.indexOf(value) === index
      );
    });
  }
  openDialog() {
    this.dialogRef.open(ModalComponent);
  }
  openDialogBoard(id: number) {
    this.dialogRef.open(AddBoardModelComponent);
    this.value.itemId = id;
  }

  likeStar(id: number, b: boolean, item1: Item) {
    item1.star = !b;
    this.itemService.updateItem(id, item1).subscribe((res) => {});
    // this.ngOnInit();
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

  pin(i: Item) {
    if (i.pin === 'pin') {
      i.pin = 'Unpin';
    } else {
      i.pin = 'pin';
    }
    this.itemService.updateItem(i.itemId, i).subscribe((res) => {});
  }

  arrangeInAlphabet() {
    const arrangeAlphabet = this.item.slice().sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    const pin = arrangeAlphabet.filter((p) => p.pin === 'pin');
    const Unpin = arrangeAlphabet.filter((p) => p.pin !== 'pin');
    this.item = [...pin, ...Unpin];
    this.modifiedDate = false;
  }

  ReverseInAlphabet() {
    const ReverseAlphabet = this.item.slice().sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
    const pin = ReverseAlphabet.filter((p) => p.pin === 'pin');
    const Unpin = ReverseAlphabet.filter((p) => p.pin !== 'pin');
    this.item = [...pin, ...Unpin];
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
    const pin = creationDate.filter((p) => p.pin === 'pin');
    const Unpin = creationDate.filter((p) => p.pin !== 'pin');
    this.item = [...pin, ...Unpin];
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
    const pin = creationDate.filter((p) => p.pin === 'pin');
    const Unpin = creationDate.filter((p) => p.pin !== 'pin');
    this.item = [...pin, ...Unpin];
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
    const pin = updationDate.filter((p) => p.pin === 'pin');
    const Unpin = updationDate.filter((p) => p.pin !== 'pin');
    this.item = [...pin, ...Unpin];
    this.modifiedDate = true;
  }

  ReverseUpdationTime() {
    const creationDate = this.item.slice().sort((a, b) => {
      const dateA = new Date(a.updationTime);
      const dateB = new Date(b.updationTime);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
    creationDate.reverse();
    const pin = creationDate.filter((p) => p.pin === 'pin');
    const Unpin = creationDate.filter((p) => p.pin !== 'pin');
    this.item = [...pin, ...Unpin];
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
