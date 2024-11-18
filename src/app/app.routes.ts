import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { NgModule } from '@angular/core';
import { SignInFormComponent } from './pages/sign-in-form/sign-in-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { AuthGuardService } from './service/authgurad/auth-guard.service';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { SendMailComponent } from './pages/sendMail/send-mail/send-mail.component';

export const routes: Routes = [
    { path: "", component: SignInFormComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuardService],
        children:[
            {path: 'configuration', component:ConfigurationComponent,canActivate: [AuthGuardService]},
            {path: 'contacts', component:ContactsComponent,canActivate: [AuthGuardService]},
            {path:'sendmail',component:SendMailComponent,canActivate:[AuthGuardService]}
        ]
    },
    
];
    
