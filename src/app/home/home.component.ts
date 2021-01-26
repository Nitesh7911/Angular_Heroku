import { Component, OnInit } from '@angular/core';
import { Image } from '../model/Image';
import { Book } from '../model/Book';
import { MainServiceService } from '../service/main-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  page = 1;
  pageSize =12;

  images:Image[];
  image:any;
  books:Book[];
  Math: any;

  constructor(private mainService: MainServiceService) { 
 
  }

  //ngOnInit(): void {

    // this.mainService.getImages().subscribe(data => {
    //   this.images = data;
    //   console.log(this.images);
    // });

    // this.mainService.getBooks().subscribe(data => {
    //   this.books = data;
    //   console.log(this.books);
    // });

  //}

  products;
  displayProducts;
  categories = [];
  filterArray = [];
  selectedItem = [
  ];
  searchText;

  ngOnInit(): void {

    this.Math = Math;

    this.mainService.getImages().subscribe(data => {
     this.images = data;
     console.log(this.images);
     // this.image=Math.floor(Math.random() * 9) + 1;
     // console.log(this.image);
   });

    // this.image=Math.floor(Math.random() * 9) + 1;
    // console.log(this.image);
    this.mainService.getProducts().subscribe((products) => {
      this.products = products;
      this.displayProducts = products;
      this.products.map((prod) => {
        if (!this.categories.includes(prod.type)) {
          this.categories.push(prod.type);
          this.filterArray.push(prod.type);
        }
      });
      const Items= sessionStorage.getItem("selectedItem")
      if(Items!=null){
        const ItemsJSON = JSON.parse(Items)
        this.selectedItem=ItemsJSON
      }
    });
  }


  filter = (e) => {
    if(e=="All"){
      this.filterArray=[...this.categories]
    }else{
      this.filterArray=[]
      this.filterArray.push(e)
    }
    // if (e.target.checked) {
    //   if (!this.filterArray.includes(e.target.value)) {
    //     this.filterArray.push(e.target.value);
    //   }
    // } else {
    //   const index = this.filterArray.indexOf(e.target.value);
    //   if (index > -1) {
    //     this.filterArray.splice(index, 1);
    //   }
    // }
    this.updateProducts();
  };
  updateProducts = () => {
    this.displayProducts = [...this.products];
    var i = 0;
    while (i < this.displayProducts.length) {
      if (!this.filterArray.includes(this.displayProducts[i].type)) {
        this.displayProducts.splice(i, 1);
      } else {
        ++i;
      }
    }
  };
  inCart = (product) => {
    for (let i = 0; i < this.selectedItem.length; i++) {
      if (this.selectedItem[i].bookID == product.bookID) {
        return this.selectedItem[i].quantity;
      }
    }
    return 0;
  };
  addToCart = (product) => {
    const index = this.selectedItem.findIndex(
      (currProduct) => currProduct.bookID == product.bookID
    );
    if (index > -1) {
      this.selectedItem[index].quantity += 1;
    } else {
      let obj = product;
      obj.quantity = 1;
      this.selectedItem.push(obj);
    }
    this.setToSessionStorage()
  };
  removeFromCart = (product) => {
    const index = this.selectedItem.findIndex(
      (currProduct) => currProduct.bookID == product.bookID
    );
    if(this.selectedItem[index].quantity==1){
      this.selectedItem.splice(index, 1);
    }else{
      this.selectedItem[index].quantity -= 1;
    }
    this.setToSessionStorage()
  };
  setToSessionStorage=()=>{
    const items = JSON.stringify(this.selectedItem)
    sessionStorage.setItem("selectedItem",items)
  }
  hello=()=>{
    console.log("hello");
    
  }

  

}
