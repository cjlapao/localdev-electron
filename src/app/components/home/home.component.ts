import { Component, OnInit } from '@angular/core';
import { DevelopmentToolsService } from '../../services/development-tools.service';
import { faCog } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faCog = faCog;
  constructor(public toolsSvc: DevelopmentToolsService) {}

  ngOnInit() {}
}
