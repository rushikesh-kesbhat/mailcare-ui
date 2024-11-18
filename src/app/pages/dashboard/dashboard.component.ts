import { Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { CustomSidenavComponent } from './custom-sidenav/custom-sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavContainer,
    MatSidenav,
    RouterOutlet,
    MatSidenavContent,
    CustomSidenavComponent,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? "65px" : "250px"));

  
}
