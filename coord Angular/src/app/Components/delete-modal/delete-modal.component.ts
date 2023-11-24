import { Component, ViewChild } from '@angular/core';
import { ItemService } from 'src/app/Services/item.service';
import { passValueService } from 'src/app/Services/passValue.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrentUser } from 'src/app/Models/CurrentUser';
import { LoginService } from 'src/app/Services/login.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {

  user:CurrentUser | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private itemService: ItemService,
    private value: passValueService,
    private loginService:LoginService,
  ) {}


  delete() {
    this.itemService.deleteItem(this.value.deleteItem).subscribe((res) => {
      this.loginService.login().subscribe((data) => {
        this.user = data.find((a: any) => {
          return (
            a.email ===this.value.user.email
          );
        });
        if (this.user) {
          console.log(this.user)
          this.value.user=this.user
        }
      })
    },err=>{
      console.log(err);
    });
    this.cancel();
  }

  
  cancel() {
    this.dialogRef.close();
  }
}
