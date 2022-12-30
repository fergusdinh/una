import { NgModule } from '@angular/core';
import { SharedModule, addNavMenuSection } from '@vendure/admin-ui/core';

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuSection(
      {
        id: 'help',
        label: 'Help',
        items: [
          {
            id: 'feature-request',
            label: 'Feature Request',
            routerLink: ['/extensions/help/feature-request'],
            icon: 'talk-bubbles',
          },
          {
            id: 'marketplace-request',
            label: 'Marketplace Request',
            routerLink: ['/#'],
            icon: 'chat-bubble',
            onClick: () => {
              window.open('https://bavaan.com/', '_blank');
            },
          },
          {
            id: 'usage-guide',
            label: 'Usage Guide',
            routerLink: ['/#'],
            icon: 'book',
            onClick: () => {
              window.open('https://bavaan.com/', '_blank');
            },
          },
        ],
      },
      // Add this section before the "settings" section
      'settings'
    ),
  ],
})
export class HelpSharedModule {}
