import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { passValueService } from 'src/app/Services/passValue.service';
import { LoginService } from 'src/app/Services/login.service';
import { ItemService } from 'src/app/Services/item.service';
import { Item } from 'src/app/Models/Item';
import { BoardModelComponent } from '../board-model/board-model.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  list: number = 0;
  id: number = 0;
  mail!: string;
  item!: Item[];
  tagList!: string[];
  modifiedDate: boolean = false;

  constructor(
    private dialogRef: MatDialog,
    private dialogRe: MatDialog,
    private router: Router,
    private value: passValueService,
    private loginService: LoginService,
    private itemService: ItemService
  ) { }
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

  getByMail(val: string) {
    this.loginService.getByMail(val).subscribe((res) => {
      this.value.user = res;
      this.item = res.items;
      // this.list = res.items.length;
      // this.value.starItem = res.items.filter((p) => p.star === true);
      // this.value.pinItem = res.items.filter((p) => p.pin === 'pin');
      // const pin = res.items.filter((p) => p.pin === 'pin');
      // const Unpin = res.items.filter((p) => p.pin !== 'pin');
      // this.item = [...pin, ...Unpin];
      // this.item.filter((p: any) => {
      //   this.tagList = [...this.tagList, ...p.tags];
      // });
      // this.value.tagList = this.tagList.filter(
      //   (value, index, self) => self.indexOf(value) === index
      // );
    });
  }
  openDialog() {
    this.dialogRef.open(ModalComponent);
  }
  openBoardModal() {
    this.dialogRe.open(BoardModelComponent)
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
