import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
  ],
  providers:[AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService:AuthService) {
    // Initialize the form group
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      username: ['', [Validators.required, Validators.minLength(3)]], // Username validation
      password: ['', [Validators.required, Validators.minLength(8)]], // Password validation
    });
  }

  ngOnInit(): void {}

  // Method to handle form submission
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Form Submitted', formData);
      const result=this.authService.register(formData).subscribe({
        next: (result) => {
          console.log(result); // This is where you can access the actual result
        },
        error: (error) => {
          console.error('Error occurred:', error); // Handle any errors here
        }
      });
  }
}
}
