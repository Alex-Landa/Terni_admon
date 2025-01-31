import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  openSidebar: boolean = false;

  @Output () sidebarCollapsed: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  toggleSidebar() {
    this.openSidebar = !this.openSidebar;
    this.sidebarCollapsed.emit(this.openSidebar);
  }
}
