import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
import { passValueService } from 'src/app/Services/passValue.service';
import { Item } from 'src/app/Models/Item';
import { LoginService } from 'src/app/Services/login.service';
import { CurrentUsers } from 'src/app/Models/CurrentUser';
import { ItemService } from 'src/app/Services/item.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent {

  constructor(
    private dialogRef: MatDialog,
    private router: Router,
    private value: passValueService,
    private loginService: LoginService,
    private itemService: ItemService
  ) { }

  list: number = 0;
  item!: Item[];
  forFilteritem!: Item[];
  user!: CurrentUsers;
  star: string = 'fa-regular fa-star';
  starBoolen: boolean = false;
  tagList: string[] = [];
  buttons: string[] = [];
  searchOptions: string[] = []
  searchText = "";
  modifiedDate: boolean = false;

  ngOnInit() {
    const a = sessionStorage.getItem('email');
    if (a !== null) {
      this.getByMail(a);
    }
    const b = document.querySelector('.act');
    if (b) {
      b.classList.remove('act');
    }
    document.querySelector('.' + 'alltags')?.classList.add('act');
  }

  getByMail(val: string) {
    this.loginService.getByMail(val).subscribe((res) => {
      this.value.user = res;
      this.item = res.items;
      this.forFilteritem = res.items;
      this.list = res.items.length;
      this.value.starItem = res.items.filter((p) => p.star === true);
      this.value.pinItem = res.items.filter((p) => p.pin === 'pin');
      this.item.filter((p: any) => {
        this.tagList = [...this.tagList, ...p.tags];
      });
      this.tagList = this.tagList.slice().sort((a, b) => a.localeCompare(b));
      this.tagList = this.tagList.filter((value, index, self) => self.indexOf(value) === index)
      this.value.tagList = this.tagList
      this.buttons = this.tagList
      this.searchOptions = this.buttons
    });
  }

  search(value: any) {
    this.searchOptions = this.buttons.filter((opt) => opt.toLowerCase().includes(value.toLowerCase()))
  }

  openDialog() {
    this.dialogRef.open(ModalComponent);
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

  active(name: string) {
    const a = document.querySelector('.act');
    if (a) {
      a.classList.remove('act');
    }
    document.querySelector('.' + name)?.classList.add('act');
    this.item = this.forFilteritem.filter(obj => obj.tags.some(tag => tag.toLowerCase() === name.toLowerCase()))
    this.searchText = name
    if (name === "alltags") { this.searchText = '' }
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
