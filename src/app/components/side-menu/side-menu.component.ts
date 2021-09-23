import {
  IconDefinition,
  IconPrefix,
  IconName,
} from '@fortawesome/fontawesome-common-types';
import { Component, OnInit } from '@angular/core';
import {
  faCog,
  faCactus,
  faHome,
  faCoffee,
  faBracketsCurly,
} from '@fortawesome/pro-light-svg-icons';
import { SideMenuItem } from '../../entities/side-menu-item';

export type CustomIconPrefix = IconPrefix | 'fac';
export type CustomIconName = IconName & 'test';

export const faIvanti: IconDefinition = {
  prefix: 'fac',
  iconName: 'ivanti',
  icon: [
    652,
    652,
    [],
    null,
    'M 46.272968,381.6188 H 273.89455 V 609.24039 H 46.272968 Z M 387.70509,266.82686 V 608.25922 H 614.34553 V 40.18641 H 46.272729 v 226.64045 z',
  ],
} as any;

const MENU_ITEMS: SideMenuItem[] = [
  {
    icon: faCoffee,
    name: 'Need a coffee?',
    route: '/coffe',
    id: '_coffee',
    items: [],
  },
  {
    icon: faIvanti,
    name: 'Neurons Services',
    route: '/neurons-services',
    id: '_coffee',
    items: [],
  },
  {
    icon: faBracketsCurly,
    name: 'Local Services',
    route: '/local-services',
    id: '_localServices',
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
