import { Injectable } from '@angular/core';
import { CurrentUser } from '../Models/CurrentUser';
import { Item } from '../Models/Item';
import { star } from '../Models/star';
import { Collection } from '../Models/Collection';

@Injectable({
  providedIn: 'root',
})
export class passValueService {
  user: CurrentUser = {
    id: 0,
    email: '',
    password: '',
    items: [],
    col: []
  }
  item:Item={
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
  }
  editItem:Item={
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
  }
  collections:Collection[]=[]
  deleteItem:number=0;
  starItem: Item[]=[]
  pinItem: Item[]=[]
  tagList:string[]=[];
  dummy:Item[]=[]
  itemId!:number;
}
