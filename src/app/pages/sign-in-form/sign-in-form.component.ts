import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router'; // Correct import
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModuleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'], // Correct this
})
export class SignInFormComponent {
  form: FormGroup;

  constructor(private router:Router,private authService:AuthService) {
    this.form = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.login(this.form.value).subscribe({
        next: (result) => {
          console.log(result);
           
          this.router.navigate(['/dashboard'])
        },
        error: (error) => {
          console.error('Error occurred:', error);
        }
      });
    }
  } 
  redirectToRegister() {
    console.log("Button click");
    
    this.router.navigate(['/register']); // Uncomment and ensure this is correct
  }
}
