# Vendure Saas plugin

Triggers a channel aware Store Connector based on configured events.
Events are specified in `vendure-config` and saass are configured in the database via the admin UI.

1. `yarn add vendure-plugin-saas`

## Database entity

The plugin adds an entity `SaasPerChannelEntity` to your database.
Don't forget to run a migration OR `synchronize: true` if you like living on the edge.

## Permission

This plugin adds a custom permission 'SetSaas' that is needed to set a Store Connector via the admin interface.

## vendure-config.ts

Configure which events should trigger a Store Connector call in `vendure-config.ts`. HttpMethod can be POST (empty body) or GET.

```js
import { SaasPlugin } from 'vendure-plugin-saas';

plugins: [
  SaasPlugin.init({
    httpMethod: 'POST',
    delay: 3000, // Optional if you want to wait for more events
    events: [ProductEvent, ProductVariantChannelEvent, ProductVariantEvent],
  }),
];
```

The `delay` is optional. Some actions/updates trigger mutliple events, resulting in multiple calls to your saas.
If you want to prevent this, you can set the `delay`, the plugin will then wait X seconds for more events,
before calling your saas.

## Compile admin UI

Run this script once to compile the admin UI. **Run with ts-node** to compile the admin UI:

```js
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import * as path from 'path';
import { SaasPlugin } from 'vendure-plugin-saas';

compileUiExtensions({
  outputPath: path.join(__dirname, '__admin-ui'),
  extensions: [SaasPlugin.ui],
})
  .compile?.()
  .then(() => {
    process.exit(0);
  });
```

Then, in your `vendure-config.ts` add

```js
        AdminUiPlugin.init({
            port: 3002,
            app: {
                path: path.join(__dirname, '__admin-ui/dist')
            },
        }),
```

This will add a formfield for updating the Store Connector for the current channel under `Settings`:"  
![Saas admin UI](saas-admin-ui.jpeg)  
For more information about using pre-compiled admin UI in production: https://www.vendure.io/docs/plugins/extending-the-admin-ui/

## Enjoying our plugins?

Enjoy the Bavaan Vendure plugins? [Consider becoming a sponsor](https://github.com/sponsors/bavaan-platform).

Or check out [bavaan.com](https://bavaan.com) for more articles about our integrations.
<br/>
<br/>
<br/>
[![bavaan.com logo](https://bavaan.com/wp-content/uploads/2022/07/bavaan-logo-white-189x100.png)](https://bavaan.com)
