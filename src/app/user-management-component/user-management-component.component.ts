import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../User';


@Component({
  selector: 'app-user-management-component',
  templateUrl: './user-management-component.component.html',
  styleUrls: ['./user-management-component.component.css']
})
export class UserManagementComponentComponent implements OnInit {
  myForm: FormGroup;

  userName: AbstractControl;
  id: AbstractControl;
  password: AbstractControl;
  users$: Observable<User>;

  currentUser: any;

  bassUrl = 'http://127.0.0.1:8080/'


  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'userName': [''],
      'password': [''],
      'id': ['']
    });
    this.userName = this.myForm.controls['userName'];
    this.id = this.myForm.controls['id'];
    this.password = this.myForm.controls['password'];
  }

  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.bassUrl + 'users');
  }
  refreash() {
    this.users$ = <Observable<User>>this.httpClient.get(this.bassUrl + 'users');
  }

  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }


  search() {
    if (this.id.value) {
      this.users$ = <Observable<User>>this.httpClient.get(this.bassUrl + 'users/' +
        this.id.value);
    } else {
      this.users$ = <Observable<User>>this.httpClient.get(this.bassUrl + 'users');
    }
  }
  add() {
    this.httpClient.post(this.bassUrl + "user", this.myForm.value).subscribe(

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
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.delete(this.bassUrl + 'user/' +
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
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.put(this.bassUrl + 'user',
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
