import { ExtraKubernetesService } from './../../../app/src/interfaces/settings';
import { Injectable } from '@angular/core';

const TEST_ADDONS: ExtraKubernetesService[] = [
  {
    helm: {
      name: 'test1',
      path: './test1',
      chartValueFile: [
        {
          key: 'testkey1',
          value: 'testValue1',
        },
        {
          key: 'complex',
          value: {
            key: 'complex2',
            value: 'valueComplex2',
          },
        },
      ],
    },
    id: '_test1',
    name: 'complex',
  },
  {
    helm: {
      name: 'test2',
      path: './test2',
    },
    id: '_test2',
    name: 'simple',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ExtrasKubernetesAddonsService {
  public addons: ExtraKubernetesService[];
  constructor() {
    this.addons = [];
  }

  addTestAddons() {
    this.addons.push(...TEST_ADDONS);
  }
}
