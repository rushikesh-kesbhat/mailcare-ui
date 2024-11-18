import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SignInFormComponent } from './pages/sign-in-form/sign-in-form.component';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { AuthGuardService } from './service/authgurad/auth-guard.service';
import { CreateNewListPopUpComponent } from './pages/contacts/create-new-list-pop-up/create-new-list-pop-up.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AddContactPopUpComponent } from './pages/contacts/add-contact-pop-up/add-contact-pop-up.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    SignInFormComponent,
    HttpClientModule,
    ToastModule,
    ConfigurationComponent,
    ContactsComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[MessageService]
})

export class AppComponent {
open($event: Event) {
throw new Error('Method not implemented.');
}
  title = 'mailcare-ui';
}
