import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthservicesService } from '../../../data-access/services/authservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthservicesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.access_token);
        console.log('login thành công, chuyển hướng đến /application/list');
        this.router
          .navigate(['/authorized/application/list'])
          .then((success) => {
            console.log('Chuyển hướng thành công?', success);
          });
      },
      error: (err) => {
        alert('Sai tài khoản hoặc mật khẩu');
      },
    });
  }
}
