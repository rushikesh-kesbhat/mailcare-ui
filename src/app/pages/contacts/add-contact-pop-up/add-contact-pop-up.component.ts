import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ContactlistService } from '../../../service/contactListService/contactlist.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-contact-pop-up',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, MatDialogModule,CommonModule],
  providers:[MessageService],
  templateUrl: './add-contact-pop-up.component.html',
  styleUrls: ['./add-contact-pop-up.component.scss']
})
export class AddContactPopUpComponent {
  listForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddContactPopUpComponent>,
    private fb: FormBuilder,
    private contactListService: ContactlistService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: { listId: number }
  ) {
    this.listForm = this.fb.group({
      email: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      description: ['']
    });
  }

  submit() {
    if (this.listForm.valid) {
      const contact = { ...this.listForm.value, listId: this.data.listId };
      this.contactListService.addNewContactInList(contact).subscribe({
        next: (result) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `New contact added` });
          setTimeout(() => {
            this.dialogRef.close();
          }, 500)
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This contact already Exist!' });
        }
      });
    }
  }
}
