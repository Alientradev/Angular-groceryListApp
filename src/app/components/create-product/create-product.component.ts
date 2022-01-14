import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroceryService } from '../../services/grocery.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  createProduct: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title: string = 'Producto';

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private _groceryService: GroceryService,
              private aRoute: ActivatedRoute,
              private router: Router) {
    this.createProduct = this.fb.group({
      product: ['', Validators.required],
      amount: ['', Validators.required],
      price: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEdit();
  }

  addEditProduct() {
  
    if(this.createProduct.invalid) {
      this.toastr.error('Hello world!', 'Toastr fun!');
      return;
    }

    if(this.id === null){
      this.addProduct();
    } else {
      this.editProduct(this.id);
    }

    }

    addProduct() {

      const groceryProduct: any = {
        product: this.createProduct.value.product,
        amount: this.createProduct.value.amount,
        price: this.createProduct.value.price,
        total: this.createProduct.value.amount * this.createProduct.value.price,
        creationDate: new Date(),
        updateDate: new Date()
      }
  
      this.title = 'Crear Producto'
      this.loading = true;
      this._groceryService.addProduct(groceryProduct).then(() => {
        this.toastr.success('Producto agregado a la lista!', 'Producto Registrado');
        this.createProduct.reset();
        console.log('producto registrado con exito');
        this.loading = false;
      }).catch((error) => {
        console.log(error);
        this.toastr.error('Algo salio mal!','Error')
        this.loading = false;
      })
    }

    editProduct(id: string) {

      const groceryProduct: any = {
        product: this.createProduct.value.product,
        amount: this.createProduct.value.amount,
        price: this.createProduct.value.price,
        total: this.createProduct.value.amount * this.createProduct.value.price,
        updateDate: new Date()
      }

      this.loading = true;

      this._groceryService.updateproduct(id, groceryProduct).then(() =>{
        this.loading = false;
        this.toastr.success('Producto Modificado con exito','Producto Modificado');
        this.router.navigate(['/grocery-list']);
      }).catch((error) => {
        console.log(error)
      }) 


    }

    esEdit() {
      if( this.id !== null ){
        this.loading = true
        this._groceryService.editProduct(this.id).subscribe((data) => {
          this.loading = false  
          this.createProduct.setValue({
            product: data.payload.data()['product'],
            amount: data.payload.data()['amount'],
            price: data.payload.data()['price']
          })
        })
      }
    }

  }

