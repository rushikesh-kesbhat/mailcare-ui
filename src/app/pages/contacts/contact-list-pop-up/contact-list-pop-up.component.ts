import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ContactlistService } from '../../../service/contactListService/contactlist.service';
import { MatIconModule } from '@angular/material/icon';
import { DialogRef } from '@angular/cdk/dialog';
import { AddContactPopUpComponent } from '../add-contact-pop-up/add-contact-pop-up.component';
import { MatTableModule } from '@angular/material/table';
interface Email {
  id: number;
  listId: number;
  email: string;
  firstName: string;
  lastName: string;
  description: string;
}
@Component({
  selector: 'app-contact-list-pop-up',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatIconModule ,
    MatDialogModule,
    MatTableModule
  ],
  templateUrl: './contact-list-pop-up.component.html',
  styleUrl: './contact-list-pop-up.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ContactListPopUpComponent {
   contactListData:any={};
   listId:any
   contacts:any;
   dataSource: Email[]=[]
  constructor(
    public dialogRef: MatDialogRef<ContactListPopUpComponent>,private contactListService:ContactlistService, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { listId: number }
  ) {
    this.listId= data.listId;
    this.contactListService.getListDetailas(data.listId).subscribe({
      next: (result) => {
        this.contactListData=result;
        console.log(result);

        this.contactListService.getContactsByListId(data.listId).subscribe({
          next: (result) => {
            this.contacts=result;
            this.dataSource=this.contacts
            console.log(result);
          },
          error: (error) => {
            console.error('Error occurred:', error);
            // this.messageService.add({ severity: 'error', summary: 'Error', detail: "Something went wrong !!" });
          }}); 
      },
      error: (error) => {
        console.error('Error occurred:', error);
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: "Something went wrong !!" });
      }
    });

  }
  close(): void {
    this.dialogRef.close();
  }
  openAddContact(): void {
    this.dialog.open(AddContactPopUpComponent, {
      width: '400px',
      height: '400px',
      data: { listId: this.listId},
    })
  }
// create table
  displayedColumns: string[] = ['FirstName','LastName','email','Description','edit', 'delete'];
  

  editEmail(email: Email) {
    console.log('Edit:', email);
  }

  deleteEmail(email: Email) {
    console.log('Delete:', email);
    this.dataSource = this.dataSource.filter(e => e.id !== email.id);
  }

}
