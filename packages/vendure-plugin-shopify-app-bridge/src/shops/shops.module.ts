import { ShopsService } from './shops.service';
import {
  ConfigModule,
  ConnectionModule,
  EventBusModule,
  VendurePlugin,
} from '@vendure/core';
import { ServiceCoreModule } from '@vendure/core/dist/service/service.module';

@VendurePlugin({
  imports: [ConfigModule, ConnectionModule, EventBusModule, ServiceCoreModule],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}
