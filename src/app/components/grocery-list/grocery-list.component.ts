import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GroceryService } from 'src/app/services/grocery.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {

  product: any[] = [];

  constructor(private _groceryService: GroceryService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getProductsToList();

  }

  getProductsToList() {
    this._groceryService.getProduct().subscribe( (data) => {
      
      this.product = [];
      
      data.forEach( (element:any) => {
        this.product.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });

    });
  }

  deleteProduct(id: string) {
    this._groceryService.deleteProduct(id).catch(()=> {
      this.toastr.success('Producto eliminado con exito','Registro eliminado!')
    }).catch((err) => {
      console.log(err);
    })
  }
  

}
