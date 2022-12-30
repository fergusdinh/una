import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataService, NotificationService } from '@vendure/admin-ui/core';
import { FormBuilder } from '@angular/forms';
import { ConnectorsExport, ConnectorResponse } from '../types';
import {
  getAllConnectorsConnectedOfChannel,
  getAvailableConnectorsExportQuery,
} from '../queries';
import axios from 'axios';
import { getSessionToken } from '@shopify/app-bridge-utils';
import createApp from '@shopify/app-bridge';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  shareReplay,
  skip,
  skipUntil,
  startWith,
  switchMap,
  switchMapTo,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'connector-list-component',
  styleUrls: ['./connector-list.component.scss'],
  templateUrl: './connector-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectorListComponent implements OnInit {
  connectorsList: ConnectorsExport[] = [];
  connectorsConnected: string[] = [];
  connectorsReconnected: string[] = [];
  channelPriceIncludesTax$: Observable<boolean>;

  constructor(
    protected dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataService
      .query(getAvailableConnectorsExportQuery)
      .refetchOnChannelChange()
      .mapStream((data: any) => data.availableConnectorsExport)
      .subscribe((connectorsExport) => {
        this.connectorsList = [];
        this.cdr.detectChanges();
        this.connectorsList = connectorsExport as ConnectorsExport[];
        this.cdr.detectChanges();
      });

    this.dataService
      .query(getAllConnectorsConnectedOfChannel)
      .refetchOnChannelChange()
      .mapStream((data: any) => data.getAllConnectorsConnectedOfChannel)
      .subscribe((allConnectorsConnectedOfChannel: any) => {
        this.connectorsConnected = [];
        this.cdr.detectChanges();
        this.connectorsReconnected = [];
        this.cdr.detectChanges();
        if (allConnectorsConnectedOfChannel.length > 0) {
          for (const connector of allConnectorsConnectedOfChannel) {
            this.checkConnect(connector.type, connector.settings);
          }
        }
      });
  }

  btnRedirect(type: string) {
    this.router.navigate([`extensions/connector/${type}`]);
  }

  reConnect(type: string) {
    try {
      switch (type) {
        case 'shopify':
          this.dataService
            .query(getAllConnectorsConnectedOfChannel)
            .refetchOnChannelChange()
            .mapStream((data: any) => data.getAllConnectorsConnectedOfChannel)
            .subscribe((allConnectorsConnectedOfChannel: any) => {
              if (allConnectorsConnectedOfChannel.length > 0) {
                const connector = allConnectorsConnectedOfChannel.find(
                  (connectorConnected) => connectorConnected.type === type
                );
                const settings = JSON.parse(connector.settings);
                window.location.href = `/api/online/auth?shop=${settings.url.replace(
                  /https?:\/\//,
                  ''
                )}`;
              }
            });
          break;
        default:
          this.btnRedirect(type);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async checkConnect(type: string, rawSettings: string) {
    try {
      const settings = JSON.parse(rawSettings);
      switch (type) {
        case 'shopify':
          const response = await axios({
            url: `/check-connect`,
            method: 'get',
            headers: {
              sessionId: settings.sessionId,
            },
          });
          if (response && response.status === 200) {
            this.connectorsReconnected = this.connectorsReconnected.filter(
              (connectorReconnected: string) => connectorReconnected !== type
            );
            this.connectorsConnected = [...this.connectorsConnected, type];
            this.cdr.detectChanges();
          } else {
            this.connectorsReconnected = [...this.connectorsReconnected, type];
            this.cdr.detectChanges();
          }
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
