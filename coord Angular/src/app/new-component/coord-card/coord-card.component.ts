import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardModelComponent } from 'src/app/Components/add-board-model/add-board-model.component';
import { DeleteModalComponent } from 'src/app/Components/delete-modal/delete-modal.component';
import { EditModalComponent } from 'src/app/Components/edit-modal/edit-modal.component';
import { Item } from 'src/app/Models/Item';
import { ItemService } from 'src/app/Services/item.service';
import { passValueService } from 'src/app/Services/passValue.service';

@Component({
  selector: 'app-coord-card',
  templateUrl: './coord-card.component.html',
  styleUrls: ['./coord-card.component.css']
})
export class CoordCardComponent {


  @Input() item!: Item[];
  modifiedDate: boolean = false;

  constructor(
    private dialogRef: MatDialog,
    private value: passValueService,
    private itemService: ItemService
  ) { }

  convetDateToShortTerm(InsertionDate: any, updationDate: any): string {
    let dateObj = new Date(InsertionDate);
    const formattedDate = dateObj.getDate();
    const formattedMonth = dateObj.toLocaleString('en-us', { month: 'short' });
    const formattedString = `${formattedMonth}-${formattedDate}`;
    return formattedString;
  }

  likeStar(id: number, b: boolean, item: Item) {
    const item1 = { ...item }; // Create a shallow copy of the item
    item1.star = !b;
    this.itemService.updateItem(id, item1).subscribe(() => { }); // Removed unused parameter
  }
  openDialogBoard(id: number) {
    this.dialogRef.open(AddBoardModelComponent);
    this.value.itemId = id;
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
    const a = document.querySelector('.active');
    if (a) {
      a.classList.remove('active');
    }
    document.querySelector('.' + name)?.classList.add('active');
  }

  pin(i: Item) {
    if (i.pin === 'pin') {
      i.pin = 'Unpin';
    } else {
      i.pin = 'pin';
    }
    this.itemService.updateItem(i.itemId, i).subscribe((res) => { });
  }




}
