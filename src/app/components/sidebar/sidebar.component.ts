import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = true;
  activeTab = 'apps';
  activeSubTab = '';

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  setActiveTab(tab: string, subTab: string = '') {
    this.activeTab = tab;
    this.activeSubTab = subTab;
  }
}
