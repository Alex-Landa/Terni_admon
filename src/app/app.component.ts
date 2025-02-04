import { Component,OnInit } from '@angular/core';
import { AuthService } from './services/autentication/auth'; 
@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
// imports: [
//   DataTablesModule
//   ]
export class AppComponent {
  title = 'admin_page';
  hasUser: boolean = false;
  user: any;
  sidebarExpanded = false;

  constructor(
    private auth: AuthService,
  ) {
    this.auth.getUserLoggedInData.subscribe((data: any) => {
      if (data) {
        this.hasUser = true;
        const element = document.getElementById("sidebar");
        element?.classList.remove("logout");
      } else {
        this.hasUser = false;
        const element = document.getElementById("sidebar");
        element?.classList.remove("expanded");
        element?.classList.add("logout");
        this.auth.logOut();
      }
    });
  }

  ngOnInit(): void {
  }

  addItem(open: boolean) {
    this.sidebarExpanded = open;
    const element = document.getElementById("sidebar");
    if (this.sidebarExpanded) {
      element?.classList.add("expanded");
    } else {
      element?.classList.remove("expanded");
    }
  }

}
