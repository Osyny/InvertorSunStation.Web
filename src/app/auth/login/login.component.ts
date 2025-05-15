import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  type: string = 'password';
  isTextFieldType: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  submitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onLogin(ngForm: NgForm): void {
    if (ngForm.invalid) {
      ngForm.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.setToken(res.response);
        // TODO navigate by role
        this.router.navigateByUrl('/admin'); // Redirect to dashboard on successful login
        this.toastr.success('Login is success!', 'Success');
        this.submitting = false;
      },
      error: (err) => {
        this.toastr.error('Gmail or password is wrong!', 'Error');
        console.error('Login failed', err);
      },
    });
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
    this.isTextFieldType ? (this.type = 'text') : (this.type = 'password');
  }
}
