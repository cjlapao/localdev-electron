import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MinikubeService } from './services/minikube.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
