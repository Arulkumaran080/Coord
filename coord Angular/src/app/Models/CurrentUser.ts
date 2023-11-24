import { Collection } from "./Collection";
import { Item } from "./Item";

export interface CurrentUser{
    id:number;
    email:string;
    password:string;
    items:Item[];
    col:Collection[];
}