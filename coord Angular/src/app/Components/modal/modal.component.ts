import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/Models/Item';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/Services/item.service';
import { CurrentUsers } from 'src/app/Models/CurrentUser';
import { passValueService } from 'src/app/Services/passValue.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  tag: string = '';

  item: Item = {
    description: '',
    tags: [],
    urls: '',
    title: '',
    itemId: 0,
    star: false,
    img: '',
    pin: '',
    insertionTime: '',
    updationTime: '',
  };
  tagList: string[] = [];
  searchOptions: string[] = [];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponent>,
    private itemService: ItemService,
    private value: passValueService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    const a = sessionStorage.getItem('email');
    if (a !== null) {
      this.getByMail(a);
    }
  }

  getByMail(val: string) {
    this.loginService.getByMail(val).subscribe((res) => {
      this.value.dummy = res.items;
      this.value.dummy.filter((p: any) => {
        this.tagList = [...this.tagList, ...p.tags];
      });
      this.tagList = this.tagList.slice().sort((a, b) => a.localeCompare(b));
      this.tagList = this.tagList.filter((value, index, self) => self.indexOf(value) === index)
      this.value.tagList = this.tagList
      this.searchOptions = this.tagList
    });
  }

  search(value: any) {
    this.searchOptions = this.tagList.filter((opt) => opt.toLowerCase().includes(value.toLowerCase()))
  }

  addTag(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.item.tags.push(this.tag);
      this.tag = '';
    }
  }

  save() {
    this.CapitalizeStringarray();
    console.log(this.item);
    this.itemService.saveItem(this.item, 1).subscribe(
      (res) => {
        console.log('added');
        this.discard();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  delete(i: number) {
    this.item.tags.splice(i, 1);
  }

  discard() {
    this.dialogRef.close();
  }

  CapitalizeStringarray() {
    const formattedStrings: string[] = []

    this.item.tags.forEach((str) => {
      const string = str.split(' ');
      const capitalArray = string.map((data) => {
        const capital = data.charAt(0).toUpperCase() + data.slice(1);
        return capital;
      })
      const formattedString = capitalArray.join('');
      formattedStrings.push(formattedString)
    })
    this.item.tags = formattedStrings
  }
}
