import { DatabaseSessionStorage } from './database.session-storage';
import { ConnectionModule, VendurePlugin } from '@vendure/core';

@VendurePlugin({
  imports: [ConnectionModule],
  providers: [DatabaseSessionStorage],
  exports: [DatabaseSessionStorage],
})
export class SessionModule {}
