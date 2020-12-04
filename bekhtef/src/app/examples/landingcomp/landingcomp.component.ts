import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../modal/modal.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-landingcomp',
  templateUrl: './landingcomp.component.html',
  styleUrls: ['./landingcomp.component.css']
})
export class LandingcompComponent implements OnInit {
  user: any;
  focus: any;
  focus1: any;
  allProducts: Array<any> = [];
  products: Array<any> =[];
  selected: Array<any> =[];
  startIndex = 0;
  endIndex = 9;
  page = 1;
  pageSize=9;
  productSelected: Number
  title = 'angular-text-search-highlight';
  searchText = '';
  selectedPrice: string = "0"
  selectedCategory: string = "category";
  constructor(private server: ProductService, private modalService: NgbModal) { }

// this is  a life cycle method run after changing text in the search text 
  modelChangeFn(value) {
      this.searchText = value
    if (this.searchText.length < 1){
        this.products = this.allProducts
    }
  }
  // ngAfterContentChecked() {
  //   console.log('selectedPrice', this.selectedPrice)
  //   console.log('selectedCategory',this.selectedCategory)
  //   console.log('searchText',this.searchText)
  //   }
// here it runs this life cycle method when  we just refresh this page 
  ngOnInit() {
    this.server.getProducts().subscribe((data: any) => {
      this.allProducts = data
      console.log(this.products)
      this.products = this.allProducts

      this.user = JSON.parse(window.localStorage.getItem('id'))

    })
     
  }
// this is for displaying the more information button  for each product 
 

  // /here we are rendering pagination method

  updateIndex(pageIndex) {
    this.startIndex = pageIndex * 9;
    this.endIndex = this.startIndex + 9
    document.documentElement.scrollTop = 0;
    this.page = Math.ceil(this.endIndex / 9)
  }
  getArrayFromNumber(length) {
    return new Array(Math.floor(length / 10))
  }
  
  clickOnMe(item){
    const filter = this.allProducts.filter(data =>  data.name === item.name)
    if(filter.length===0){
      return ["not found"]
  }
    this.products=filter; 
  }
    
}


