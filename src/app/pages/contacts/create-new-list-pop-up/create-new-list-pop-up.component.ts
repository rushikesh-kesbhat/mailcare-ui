import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { AuthService } from '../../../service/auth.service';
import { ContactlistService } from '../../../service/contactListService/contactlist.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-create-new-list-pop-up',
  standalone: true,
  imports: [
    DialogModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule ,
    CommonModule
  ],

  templateUrl: './create-new-list-pop-up.component.html',
  styleUrl: './create-new-list-pop-up.component.scss'
})
export class CreateNewListPopUpComponent {
  listForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateNewListPopUpComponent>,
    private fb: FormBuilder,
    private authService:AuthService,

  ) {
    this.listForm = this.fb.group({
      listName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submit() {
    if (this.listForm.valid) {
      console.log('Form Data:', this.listForm.value);
      const contactList=this.listForm.value;

      const user=this.authService.getUser();
      contactList.userId=user?.id;

      this.dialogRef.close(contactList);
    }
      
    }
  }
