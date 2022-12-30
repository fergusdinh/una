import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';
import { createFeatureRequest, getCurrentUser } from '../queries';

import { DataService, NotificationService } from '@vendure/admin-ui/core';

@Component({
  selector: 'feature-request',
  styleUrls: ['./feature-request.component.scss'],
  templateUrl: './feature-request.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRequestComponent implements OnInit {
  featureDescriptionForm: FormGroup;
  identifier: string;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.featureDescriptionForm = new FormGroup({
      description: new FormControl(''),
    });
  }

  async ngOnInit() {
    await this.dataService
      .query(getCurrentUser)
      .mapStream((d: any) => d.me)
      .subscribe((result) => {
        this.identifier = result.identifier;
        this.cdr.markForCheck();
      });
    // sgMail.setApiKey('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');
  }

  async onSubmit() {
    const formValue = this.featureDescriptionForm.value;

    if (formValue.description) {
      try {
        await this.dataService
          .mutate(createFeatureRequest, {
            input: {
              content: formValue.description,
              identifier: this.identifier,
            },
          })
          .toPromise();

        this.notificationService.success('Send success', {
          entity: 'Feature-request',
        });
      } catch (error) {
        this.notificationService.error('Error', {
          entity: 'Feature-request',
        });
      }
    } else {
      this.notificationService.error('Error', {
        entity: 'Feature-request',
      });
    }
  }
}
