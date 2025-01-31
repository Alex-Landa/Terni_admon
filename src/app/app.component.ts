import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "./Components/shared/header/header.component";
import { SidebarComponent } from "./Components/shared/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'area_admon';
  hasUser: boolean = false;
  adjust: boolean = false;

  sideBarAdjust(message: boolean) {
    this.adjust = message;
  }

  change(){
    this.hasUser = !this.hasUser
    //al ceerrar sesion debe ser adjust = false
  }
}

