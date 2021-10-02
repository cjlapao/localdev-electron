import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss'],
})
export class TesterComponent implements OnInit {
  @Input() enable = false;

  constructor() {}

  ngOnInit(): void {}
}
