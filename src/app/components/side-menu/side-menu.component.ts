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
import {
  facIvanti,
  facKubernetes,
} from '../../modules/shared/custom-icons/custom-icons';

const MENU_ITEMS: SideMenuItem[] = [
  {
    icon: faCoffee,
    name: 'Need a coffee?',
    route: '/coffe',
    id: '_coffee',
    items: [],
  },
  {
    icon: facKubernetes,
    name: 'Minikube',
    route: '/cluster/minikube',
    id: '_minikube',
    items: [],
  },
  {
    icon: facIvanti,
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
