import { Component, OnInit } from '@angular/core';
import { faCog, faCactus, faHome } from '@fortawesome/pro-light-svg-icons';
import { SideMenuItem } from '../../entities/side-menu-item';

const MENU_ITEMS: SideMenuItem[] = [
  {
    icon: faCactus,
    name: 'coffeBreak',
    route: '/coffe',
    id: '_coffee',
    items: [],
  },
];

const FOOTER_ITEMS: SideMenuItem[] = [
  {
    icon: faCog,
    name: 'Settings',
    route: '/settings',
    id: '_settings',
    items: [],
  },
];

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  faHome = faHome;
  activeItem: string = '';

  public menuItems: SideMenuItem[];
  public footerItems: SideMenuItem[];

  constructor() {
    this.menuItems = [];
    this.footerItems = [];
  }

  ngOnInit() {
    this.menuItems.push(...MENU_ITEMS);
    this.footerItems.push(...FOOTER_ITEMS);
  }
}
