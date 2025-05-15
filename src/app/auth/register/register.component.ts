import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { RegisterUserDto } from '../../models/auth/register-user.dto';
import { ValidationError } from '../../shared/validation/validation.api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  registerDto: RegisterUserDto = new RegisterUserDto();

  type: string = 'password';
  isTextFieldType: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  submitting = false;

  passwordValidationErrors: ValidationError[] = [
    {
      name: 'pattern',
      localizationKey:
        'Passwords Must Be At Least 8 harassers Contain Lower case Upper case Number',
      propertyKey: '',
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onRegister(ngForm: NgForm): void {
    if (ngForm.invalid) {
      ngForm.form.markAllAsTouched();
      return;
    }
    this.registerDto.roles = ['user'];

    this.authService
      .register(this.registerDto)
      .pipe(
        finalize(() => {
          this.submitting = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.submitting = true;
          // TODO navigate by role
          this.router.navigateByUrl('/admin'); // Redirect to dashboard on successful login
          this.toastr.success(res.message, 'Success');
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
