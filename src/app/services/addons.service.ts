import { Injectable } from '@angular/core';
import { DefaultAddon } from '../entities/addons';

const DEFAULT_ADDONS: DefaultAddon[] = [
  {
    id: 'LOCAL_REGISTRY',
    name: 'Local Registry',
  },
  {
    id: 'LOCAL_REGISTRY1',
    name: 'Some Local Registry',
  },
  {
    id: 'LOCAL_REGISTRY2',
    name: 'Local and Registry',
  },
];
@Injectable({
  providedIn: 'root',
})
export class AddonsService {
  public defaultAddons: DefaultAddon[];

  constructor() {
    this.defaultAddons = [];
    this.defaultAddons.push(...DEFAULT_ADDONS);
  }
}
