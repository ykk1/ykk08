import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { product } from './pros';


@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  myForm: FormGroup;

  Name: AbstractControl;
  id: AbstractControl;
  price: AbstractControl;
  products$: Observable<product>;

  currentUser: any;

  bassUrl = 'http://127.0.0.1:8080/'
  currentproduct: any;


  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'Name': [''],
      'price': [''],
      'id': ['']
    });
    this.Name = this.myForm.controls['Name'];
    this.id = this.myForm.controls['id'];
    this.price = this.myForm.controls['price'];
  }

  ngOnInit(): void {
    this.products$ = <Observable<product>>this.httpClient.get(this.bassUrl + 'products');
  }
  refreash() {
    this.products$ = <Observable<product>>this.httpClient.get(this.bassUrl + 'products');
  }

  select(u: product) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }


  search() {
    if (this.id.value) {
      this.products$ = <Observable<product>>this.httpClient.get(this.bassUrl + 'products' +
        this.id.value);
    } else {
      this.products$ = <Observable<product>>this.httpClient.get(this.bassUrl + 'products');
    }
  }
  add() {
    this.httpClient.post(this.bassUrl + "product", this.myForm.value).subscribe(

      (val: any) => {
        console.log(this.myForm.value)
        if (val.succ) {
          this.ngOnInit();
          alert('添加成功！');

        }
      }
    )
  }
  delete() {
    if (!this.currentproduct) {
      alert('必须先选择产品!');
    } else {
      this.httpClient.delete(this.bassUrl + 'product/' +
        this.currentUser.id).subscribe(
          (val: any) => {
            if (val.succ) {
              this.refreash();
              alert('删除成功!');
            }
          }
        )
    }
  }

  update() {
    if (!this.currentproduct) {
      alert('必须先选择产品!');
    } else {
      this.httpClient.put(this.bassUrl + 'product',
        this.myForm.value).subscribe(
          (val: any) => {
            if (val.succ) {
              this.refreash();
              alert('修改成功!');
            }
          }
        )
    }
  }

}