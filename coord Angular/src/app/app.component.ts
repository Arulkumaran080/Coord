import { Component, OnInit } from '@angular/core';
import { DataService } from './Services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'coord';
  isLoading:boolean=false
  show:any

  constructor(private data:DataService){}

  ngOnInit() {
    this.show=this.data.showHead
  }

  
}
