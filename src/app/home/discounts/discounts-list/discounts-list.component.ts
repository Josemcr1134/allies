import { Component, OnInit } from '@angular/core';
import { DiscountsService } from 'src/app/services/discounts.service';

@Component({
  selector: 'app-discounts-list',
  templateUrl: './discounts-list.component.html',
  styleUrls: ['./discounts-list.component.css']
})
export class DiscountsListComponent implements OnInit {

  public Discounts:any[] = [];
  public page:number = 0;
  public offset:number = 0;
  public limit:number = 10;
  public next:any;
  public previous:any;
  public searchTerm:string ='';
  constructor(public discountsSvc:DiscountsService) { }

  ngOnInit(): void {
    this.GetDiscounts();
  }

  GetDiscounts(){
    this.discountsSvc.GetAllieDiscounts(this.limit, this.offset, this.searchTerm)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) =>{
                    console.log(resp);
                    this.next = resp.next;
                    this.previous = resp.previous;
                    this.Discounts = resp.results;
                  }
                })
  };
  PaginationDiscounts(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.Discounts.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetDiscounts();
  };

}
