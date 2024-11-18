import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList, MatListItemTitle, MatListModule} from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

export type MenuItem={
  icon:String;
  label:String;
  route:any;
}
@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    MatNavList,
    MatIcon,
    CommonModule,
    RouterLink,
    MatListItem,
    MatListItem,
    MatListItemTitle,
    MatListModule,
    RouterLink,
    RouterModule,
    RouterLinkActive
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})


export class CustomSidenavComponent {

  sidenavCollapsed= signal(false);
  @Input() set collapsed(val: boolean){
    this.sidenavCollapsed.set(val);
  }


  menuItems = signal<MenuItem[]>([
    // {
    //   icon: "dashboard",
    //   label: "Dashboard",
    //   route: "",
    // },
    {
      icon: "video_library",
      label: "configuration",
      route: "configuration",
    },
    {
      icon: "contacts_product",
      label: "contacts",
      route: "contacts",
    },
    {
      icon: "mail",
      label: "Send Mail",
      route: "sendmail",
    }
  ]);

  profilePicSize= computed(()=> this.sidenavCollapsed() ? '30': '100');



}
