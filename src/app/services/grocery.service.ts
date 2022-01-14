import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  constructor(private firestore: AngularFirestore) {

  }

  addProduct(groceryProduct: any): Promise<any> {
    return this.firestore.collection('products').add(groceryProduct);
  }

  getProduct(): Observable<any> {
    return this.firestore.collection('products', ref => ref.orderBy('creationDate', 'asc')).snapshotChanges(); 
  }

  deleteProduct(id: string): Promise<any> {
    return this.firestore.collection('products').doc(id).delete();
  }

  editProduct(id: string): Observable<any> {
    return this.firestore.collection('products').doc(id).snapshotChanges();
  }

  updateproduct(id: string, data:any): Promise<any> {
    return this.firestore.collection('products').doc(id).update(data);
  }

}
