import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmailService } from '../../service/emailService/email.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from '../../app.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '../../service/auth.service';



@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    ToastModule,
    AppComponent,
    ProgressSpinnerModule,
    
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
  providers:[
  ]
})
export class ConfigurationComponent {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,private emaiService:EmailService,private messageService: MessageService,private authService:AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      appPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      const user=this.authService.getUser();
      console.log('Form user id', user?.id);
      formValues.userId= user?.id
      console.log('Form Submitted', formValues);
      this.emaiService.saveEmailConfiguration(formValues).subscribe({
        next: (result) => {
          console.log(result); // This is where you can access the actual result
          this.messageService.add({ severity: 'success', summary: 'Success', detail: result?.message });
          this.loading = false;
        },
        error: (error) => {
          console.error('Error occurred:', error); // Handle any errors here
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message });
          this.loading = false;
        }
      });
    }
  }
  
  validate() {
    this.loading=true;
    this.emaiService.validateEmail(this.loginForm.value).subscribe({
      next: (result) => {
        console.log(result); // This is where you can access the actual result
        this.messageService.add({ severity: 'success', summary: 'Authorized', detail: 'Email Id and Password are validated' });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error occurred:', error); // Handle any errors here
        this.messageService.add({ severity: 'error', summary: 'Unauthorized', detail: 'Please enter valid credentials' });
        this.loading = false;
      }
    });
  }
}
