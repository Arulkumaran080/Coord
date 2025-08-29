import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../Models/Item';
interface dummyItem {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseUrl: string = 'http://localhost:8082';
  constructor(private http: HttpClient) { }

  saveItem(item: Item, id: number) {
    return this.http.post<any>(this.baseUrl + '/add/' + id, item);
  }

  updateItem(id: number, item: Item) {
    return this.http.put<Item>(this.baseUrl + '/update/item/' + id, item);
  }

  deleteItem(id: number) {
    return this.http.delete<Item>(this.baseUrl + '/delete/item/' + id);
  }

  getStarredItem() {
    return this.http.get<Item>(this.baseUrl + '/getStarItem');
  }

  getByInsertionTime(id: number) {
    return this.http.get<Item>(this.baseUrl + '/item/getByInsertionTime/' + id);
  }

  getItemByIdBasedOnTabName(tabName: string, id: number) {
    return this.http.get<Item[]>(
      this.baseUrl + '/getData/' + tabName + '/' + id
    );
  }
  getItemByIdBasedOnTabName1(tabName: string, id: number) {
    return this.http.get<dummyItem[]>(
      this.baseUrl + '/getData/' + tabName + '/' + id
    ).subscribe((data: dummyItem[]) => {
      console.log('111111111111', data);
      return data;
    });
  }
}
