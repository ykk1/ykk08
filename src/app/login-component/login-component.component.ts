import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  myForm: FormGroup;

  userName: AbstractControl;

  password: AbstractControl;

  bassUrl = 'http://127.0.0.1:8080/';



  constructor(fb: FormBuilder, private httpClient: HttpClient, private router: Router, private authService: AuthService) {
    this.myForm = fb.group(
      {
        'userName': ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(3)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],

      }
    );

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  onSubmit() { }



  login(f: any) {
    console.log(f);

    this.httpClient.post(this.bassUrl + "ykk", f).subscribe(
      (val: any) => {
        if (val.succ) {
          alert("登录成功！");
          this.authService.login();
          this.router.navigate(['/management']);
        } else {
          alert('用户名或密码错误！');
        }
      }
    );

  }


}


