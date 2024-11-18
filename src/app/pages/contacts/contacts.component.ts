import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {ButtonModule} from 'primeng/button';
import { CreateNewListPopUpComponent } from './create-new-list-pop-up/create-new-list-pop-up.component';
import { ContactlistService } from '../../service/contactListService/contactlist.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../service/auth.service';
import { ContactListPopUpComponent } from './contact-list-pop-up/contact-list-pop-up.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    ButtonModule,
    MatIconModule,
    ToastModule,
    MatIcon,
    MatIconModule,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  contactList: any;
  constructor(private dialog: MatDialog,private contactListService:ContactlistService,private authService:AuthService,
    private messageService:MessageService) {
      const user=this.authService.getUser();
      const contactList=[];

      this.contactListService.getUserList(user?.id).subscribe({
        next: (result) => {
          this.contactList=result;
          console.log(result);
        },
        error: (error) => {
          console.error('Error occurred:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Something went wrong !!" });
        }
      });
    }
  

  createNewList() {
    this.openDialog();
  }
  openListDialog(listId: number): void {
    const dialogRef = this.dialog.open(ContactListPopUpComponent, {
      height: '90vh',
      minHeight:'90vh',
  width: '80vw',
  maxHeight: '90vh',
  maxWidth: '100vw',
      data: { listId: listId },
      
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNewListPopUpComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         this.contactListService.createNewList(result).subscribe({
        next: (result) => {
          console.log(result);
          this.messageService.add({ severity: 'success', summary: 'New List created', detail:"New List created eith name "+result.listName});
        },
        error: (error) => {
          console.error('Error occurred:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Something went wrong !!" });
        }
      });
      }
    });
  }
}
