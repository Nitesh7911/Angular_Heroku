import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myVar:any=true;
  title = 'book-store';
  totalItems=()=>{
    let items=0
    const selectedItem = JSON.parse(sessionStorage.getItem('selectedItem'))
    if(selectedItem!=null){
      selectedItem.forEach(item=>{
        items+=item.quantity
      })
    }
    return items
  }
}
