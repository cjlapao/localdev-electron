import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestingComponent } from './components/testing/testing.component';
// import { MinikubeService } from './services/minikube.service';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
  {
    path: 'testing',
    component: TestingComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
