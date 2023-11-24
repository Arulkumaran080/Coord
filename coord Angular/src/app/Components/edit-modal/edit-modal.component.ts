import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Item } from 'src/app/Models/Item';
import { passValueService } from 'src/app/Services/passValue.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/Services/item.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent {
  formValue!: FormGroup;
  tags: string[] = [];
  tag: string = '';
  EditedItem: Item = {
    description: '',
    tags: [],
    urls: '',
    title: '',
    itemId: 0,
    star: false,
    img: '',
    pin: '',
    insertionTime: '',
    updationTime: ''
  };
  Itemid: number = 0;
  tagList: string[]=[];
  searchOptions: string[]=[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalComponent>,
    private itemService: ItemService,
    private value: passValueService,
    private loginService:LoginService
  ) {}

  ngOnInit() {
    this.formValue = this.formBuilder.group({
      url: [''],
      title: [''],
      des: [''],
      tag: [''],
      img: [''],
    });
    this.formValue.controls['url'].setValue(this.value.editItem.urls);
    this.formValue.controls['title'].setValue(this.value.editItem.title);
    this.formValue.controls['des'].setValue(this.value.editItem.description);
    this.formValue.controls['img'].setValue(this.value.editItem.img);
    this.tags = this.value.editItem.tags;
    this.Itemid = this.value.editItem.itemId;
    const a = sessionStorage.getItem('email');
    if (a !== null) {
      this.getByMail(a);
    }
  }

  getByMail(val: string) {
    this.loginService.getByMail(val).subscribe((res) => {
      this.value.dummy=res.items;
      this.value.dummy.filter((p: any) => {
        this.tagList = [...this.tagList, ...p.tags];
      });
      this.tagList=this.tagList.slice().sort((a,b)=>a.localeCompare(b));
      this.tagList=this.tagList.filter((value,index,self)=>self.indexOf(value)===index)
      this.value.tagList=this.tagList
      this.searchOptions=this.tagList
    });
  }

  search(value:any){
    this.searchOptions=this.tagList.filter((opt)=>opt.toLowerCase().includes(value.toLowerCase()))
  }

  edit() {
    this.EditedItem.itemId = this.Itemid;
    this.EditedItem.description = this.formValue.value.des;
    this.EditedItem.img = this.formValue.value.img;
    this.EditedItem.tags = this.tags;
    this.EditedItem.title = this.formValue.value.title;
    this.EditedItem.urls = this.formValue.value.url;
    this.EditedItem.star = this.value.editItem.star;
    this.EditedItem.pin = this.value.editItem.pin;
    this.EditedItem.insertionTime=this.value.editItem.insertionTime;
    this.CapitalizeStringarray();
    console.log(this.EditedItem);
    this.itemService
      .updateItem(this.EditedItem.itemId, this.EditedItem)
      .subscribe((res) => {});
    this.discard();
  }

  addTag(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.tags.push(this.formValue.value.tag);
      this.formValue.controls['tag'].setValue('');
    }
  }

  delete(i: number) {
    this.tags.splice(i, 1);
  }

  discard() {
    this.dialogRef.close();
  }

  CapitalizeStringarray() {
    const t: string[] = this.EditedItem.tags.map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1)
    });
    this.EditedItem.tags = t;
  }

  
}
