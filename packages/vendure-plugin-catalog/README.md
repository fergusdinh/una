# Vendure Connector plugin

Triggers a connector based on configured events. Events are specified in `vendure-config` and connectors are configured per
channel via the admin UI.

Use this plugin to trigger builds when ProductEvents or CollectionEvents occur, or send notifications to external
platforms when orders are placed by subscribing to OrderPlacedEvents!

## Plugin setup

1. `yarn add @bavaan/vendure-plugin-connector`
2. Add the ConnectorPlugin to your plugins in your `vendure-configt.ts`:

```ts
import { ConnectorPlugin } from '@bavaan/vendure-plugin-connector';

plugins: [
  ConnectorPlugin.init({
    httpMethod: 'POST',
    /**
     * Optional: 'delay' waits and deduplicates events for 3000ms.
     * If 4 events were fired for the same channel within 3 seconds,
     * only 1 connector call will be sent
     */
    delay: 3000,
    events: [ProductEvent, ProductVariantChannelEvent, ProductVariantEvent],
    /**
     * Optional: 'requestFn' allows you to send custom headers
     * and a custom body with your connector call.
     * By default, the connector POST will have an empty body
     */
    requestFn: (event) => {
      return {
        headers: { test: '1234' },
        body: JSON.stringify({ createdAt: event.createdAt }),
      };
    },
  }),
];
```

3. The plugin adds an entity `ConnectorPerChannelEntity` to your database. Don't forget to run a migration
   OR `synchronize: true` if you like living on the edge.
4. Add `Connector.ui` to your admin UI extensions:

```ts
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import * as path from 'path';
import { ConnectorPlugin } from '@bavaan/vendure-plugin-connector';

compileUiExtensions({
  outputPath: path.join(__dirname, '__admin-ui'),
  extensions: [ConnectorPlugin.ui],
})
  .compile?.()
  .then(() => {
    process.exit(0);
  });
```

For more information on admin UI extensions
see https://www.vendure.io/docs/plugins/extending-the-admin-ui/#compiling-as-a-deployment-step

5. Start the server and assign the permission `SetConnector` to administrators who should be able to configure connectors.
6. Go to `settings > connector` to set the connector url for the current channel.

## Enjoying our plugins?

Enjoy the Pinelab Vendure plugins? [Consider becoming a sponsor](https://github.com/sponsors/Pinelab-studio).

Or check out [bavaan.com](https://bavaan.com) for more articles about our integrations.
<br/>
<br/>
<br/>
[![Pinelab.studio logo](https://bavaan.com/assets/img/favicon.png)](https://bavaan.com)
