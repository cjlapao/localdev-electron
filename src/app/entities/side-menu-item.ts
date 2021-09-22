import { IconDefinition } from '@fortawesome/pro-regular-svg-icons';

export interface SideMenuItem {
  id: string;
  name: string;
  icon: IconDefinition;
  route: string;
  items: SideMenuItem[];
}
