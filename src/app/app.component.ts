import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isAuthorized$?: Observable<boolean>;

  constructor() {}
  title = 'SolarPanelWeb';

  ngOnInit(): void {}
}
