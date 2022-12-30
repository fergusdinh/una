import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '@vendure/admin-ui/core';

@Component({
  selector: 'settings',
  styleUrls: ['./settings.component.scss'],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  constructor(private dataService: DataService) {}

  async ngOnInit(): Promise<void> {}
}
