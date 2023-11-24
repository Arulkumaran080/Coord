import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Collection } from 'src/app/Models/Collection';
import { CollectionService } from 'src/app/Services/collection.service';
import { ItemService } from 'src/app/Services/item.service';
import { LoginService } from 'src/app/Services/login.service';
import { passValueService } from 'src/app/Services/passValue.service';

@Component({
  selector: 'app-add-board-model',
  templateUrl: './add-board-model.component.html',
  styleUrls: ['./add-board-model.component.css'],
})
export class AddBoardModelComponent {
  id!: number;
  mail!: string;
  collection!: Collection[];
  sampleCollection: Collection = {
    collectionId: 0,
    star: false,
    discription: '',
    imageUrl: '',
    insertionTIme: '',
    updationTime: '',
    item: [],
    collectionName: '',
  };
  CollectionsIds: number[] = [];
  CollectionId!: number;

  constructor(
    // private dialogRef: MatDialog,
    private router: Router,
    private value: passValueService,
    private loginService: LoginService,
    private itemService: ItemService,
    private collectionService:CollectionService,
    public dialogRef: MatDialogRef<AddBoardModelComponent>
  ) {}

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

  closeDailog(){
    this.dialogRef.close();
  }

  getByMail(val: string) {
    this.loginService.getByMail(val).subscribe((res) => {
      this.value.user = res;
      this.collection = res.col;
      this.value.starItem = res.items.filter((p) => p.star === true);
      this.value.pinItem = res.items.filter((p) => p.pin === 'pin');
      console.log(this.value.user.col);
    });
  }

  checkValue(e: number) {
    const index = this.CollectionsIds.indexOf(e);
    if (index !== -1) {
      this.CollectionsIds.splice(index, 1);
    } else {
      this.CollectionsIds.push(e);
    }
    console.log(this.CollectionsIds);
  }

  AddToCollections(){
    for(let i=0;i<this.CollectionsIds.length;i++){
      this.collectionService.AddItemToCollection(this.CollectionsIds[i],this.value.itemId).subscribe(res=>{
        console.log(i,this.value.itemId)
      })
    }
  }
}
