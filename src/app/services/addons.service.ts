import { Injectable } from '@angular/core';
import { DefaultAddon } from '../entities/addons';

@Injectable({
  providedIn: 'root',
})
export class AddonsService {
  public defaultAddons: DefaultAddon[];

  constructor() {
    this.defaultAddons = [];
    this.defaultAddons.push({
      id: 'LOCAL_REGISTRY',
      name: 'Local Registry',
    });
    this.defaultAddons.push({
      id: 'LOCAL_REGISTRY1',
      name: 'Some Local Registry',
    });
    this.defaultAddons.push({
      id: 'LOCAL_REGISTRY2',
      name: 'Local and Registry',
    });
  }
}
