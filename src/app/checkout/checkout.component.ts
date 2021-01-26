import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../service/main-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router,private mainService: MainServiceService,@Inject (DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }
  checkoutSuccess=()=>{

    // this.mainService.postPayment().subscribe(
    //   (res)=>{
    //     console.log(res)
    //     this.document.location.href = res["longURL"];
    //   },
    //   (err)=>{
    //     console.log(err)
    //   });

    alert("CHECKOUT SUCCESSFULL")
    sessionStorage.clear()
    this.router.navigate(['/home']);

  }
}
