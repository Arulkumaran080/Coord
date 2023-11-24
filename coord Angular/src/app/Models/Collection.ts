import { Item } from "./Item";

export interface Collection{
    collectionId:number;
    collectionName:string;
    star:boolean;
    discription:string;
    imageUrl:string;
    insertionTIme:string;
    updationTime:string;
    item:Item[];
}