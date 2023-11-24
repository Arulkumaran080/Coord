import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  baseUrl: string = 'http://localhost:8082';
  constructor(private http: HttpClient) {}

  AddItemToCollection(colId:number,itemId:number){
    return this.http.get<any>(this.baseUrl+"/col/"+colId+"/item/"+itemId);
    // http://localhost:8082/col/1/item/6
  }
}
