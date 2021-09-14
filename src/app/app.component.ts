import { Component } from '@angular/core';
import { MinikubeService } from './services/minikube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'electron-angular-helloworld';
  status = 'unknown';

  constructor(private minikube: MinikubeService) {}

  async getMinikubeStatus() {
    this.status = 'reading';
    this.status = (await this.minikube.getMinikubeStatus()).code.toString();
    console.log('testing');
  }
}
