import { Component, EventEmitter, Output, OnInit } from "@angular/core";

import { AuthService } from "../../../services/autentication/auth";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  openSidebar: boolean = false;
  user: any;
  faEyeSlash = faEyeSlash;
  hasUser: boolean = false;
  dataUser: any;

  menuSidebar : any = [
    {
      link_name: "Mapas",
      icon: "pi pi-map",
      ngxPermission_menu: "VIEW.MAP",
      sub_menu: [{
        link_name: "GPRS",
          link: "/map",
          ngxPermission_sub_menu: "VIEW.MAP"
      },{
        link_name:"RADIO",
        link:"/map2",
        ngxPermission_sub_menu: "VIEW.MAP"
      }]
    },
    {
      link_name: "Admnistración",
      icon: "pi pi-cog",
      ngxPermission_menu: "VIEW.MAP",
      sub_menu: [{
        link_name: "Usuarios",
        link: "/managment/manage-users",
        icon: "pi pi-user",
        ngxPermission_sub_menu: "VIEW.USERS",
        
      }, {
        link_name: "Roles",
        link: "/managment/manage-roles",
        icon: "pi pi-id-card",
        ngxPermission_sub_menu: "VIEW.ROLES"
      }, {
        link_name: "Permisos",
        link: "/managment/manage-permissions",
        icon: "pi pi-key",
        ngxPermission_sub_menu: "VIEW.PERMISSIONS"
      }]
    }, {
      link_name: "Estaciones",
      icon: "pi pi-chart-bar",
      sub_menu: [
        {
          link_name: "GPRS",
          link: "/stations/GPRS",
        }, {
          link_name: "RADIO",
          link: "/stations/RADIO",
        }
      ]
    },{
      link_name: "Historicos",
      icon: "pi pi-clock",
      ngxPermission_menu: "VIEW.MAP",
      sub_menu: [
        {
          link_name: "GPRS",
          link: "/historical/GPRS",
          ngxPermission_sub_menu: "VIEW.MAP"
        }, {
          link_name: "RADIO",
          link: "/historical/RADIO",
          ngxPermission_sub_menu: "VIEW.MAP"
        }
      ]
    },{
      link_name: "Monitoreo",
      link: "/mon",
      icon: "pi pi-desktop",
      ngxPermission: "READ.HOME",
      sub_menu: []
    }
  ]
  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  @Output() sideBar = new EventEmitter<boolean>();
  opener() {
    this.sideBar.emit(this.openSidebar);
  }
  constructor(private auth: AuthService) { }
  ngOnInit() {
    this.dataUser = this.auth.getTokenData();
  }

  logOut() {
    this.user = null;
    this.hasUser = false;
    this.auth.logOut();
  }
}
